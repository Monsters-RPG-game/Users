# Diagrams - startup

This file represents simplified startup flow of this application.

Last update: 07.01.2025

```text
┌────────────────────┐    
│Start               │    
└┬──────────┬───────┬┘    
┌▽────────┐┌▽─────┐┌▽────┐
│Bootstrap││Broker││Mongo│
└─────────┘└┬─────┘└─────┘
┌───────────▽──────────┐  
│"Wait for connections"│  
└──────────────────────┘  
```

<details>
  <summary>Raw diagram</summary>

  Start -> Bootstrap
  Start -> Broker -> "Wait for connections"
  Start -> Mongo

  Diagram made using Diagon 
</details>
