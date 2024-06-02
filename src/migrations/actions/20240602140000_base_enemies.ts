import * as enums from '../../enums';
import InventoryHandler from '../../modules/inventory/handler';
import Inventory from '../../modules/inventory/model';
import NpcHandler from '../../modules/npc/handler';
import Npc from '../../modules/npc/model';
import PartyHandler from '../../modules/party/handler';
import Party from '../../modules/party/model';
import StatsHandler from '../../modules/stats/handler';
import Stats from '../../modules/stats/model';

export default {
  async up(): Promise<number> {
    const partyHandler: PartyHandler = new PartyHandler();
    const statsHandler: StatsHandler = new StatsHandler();
    const inventoryHandler: InventoryHandler = new InventoryHandler();
    const npcHandler: NpcHandler = new NpcHandler();

    let counter = 0;
    const addPromises: Promise<void>[] = [];
    const updatePromise: Promise<void>[] = [];
    for (const race of Object.values(enums.ENpcRace)) {
      for (let i = 1; i <= 5; i++) {
        // const id = await npcHandler.addBasic({
        //   name: `${race}_lvl_${i}`,
        //   lvl: i,
        //   race,
        // });
        addPromises.push(
          npcHandler
            .addBasic({
              name: `${race}_lvl_${i}`,
              lvl: i,
              race,
            })
            .then(async (id) => {
              const [party, stats, inventory] = await Promise.all([
                partyHandler.addBasic(id.toString()),
                statsHandler.addBasic(id.toString()),
                inventoryHandler.addBasic(id.toString()),
              ]);
              updatePromise.push(
                npcHandler.add(
                  {
                    party,
                    inventory,
                    stats,
                  },
                  id,
                ),
              );
              counter++;
            }),
        );
      }
    }
    await Promise.all(addPromises);
    await Promise.all(updatePromise);
    return counter;
  },

  async down(): Promise<void> {
    const idsToDelete: string[] = [];
    // for (const race of Object.values(enums.ENpcRace)) {
    //   const regexPattern = new RegExp(`^${race}*`);
    //   const list = await Npc.find({ name: { $regex: regexPattern } }, { _id: 1 });
    //   list.forEach((doc) => idsToDelete.push(doc._id.toString()));
    // }
    await Npc.deleteMany({ _id: { $in: idsToDelete } }).exec();
    await Inventory.deleteMany({ userId: { $in: idsToDelete } }).exec();
    await Stats.deleteMany({ owner: { $in: idsToDelete } }).exec();
    await Party.deleteMany({ leader: { $in: idsToDelete } }).exec();
  },
};
