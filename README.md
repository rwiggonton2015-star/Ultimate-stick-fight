# Ultimate Stick Fight

A fun 2D side-scrolling game where you fight monsters and upgrade your gear!

## Getting Started

### Prerequisites
- Unity 2022 LTS or newer
- Git

### Setup
1. Clone this repository
2. Open the project in Unity
3. Open the `Main` scene in Assets/Scenes/
4. Press Play to test

## Controls

### Desktop
- **A/D** or **Arrow Keys** - Move left/right
- **Spacebar** - Jump
- **Left Click** - Attack

### Mobile
- **Left/Right Buttons** - Move left/right
- **Jump Button** - Jump
- **Attack Button** - Attack

## Project Structure
```
Assets/
├── Scripts/
│   ├── Player/
│   │   ├── PlayerController.cs
│   │   └── PlayerAnimator.cs
│   ├── Input/
│   │   └── InputManager.cs
│   ├── Enemy/
│   │   ├── EnemyController.cs
│   │   └── EnemyAI.cs
│   └── Manager/
│       └── GameManager.cs
├── Scenes/
│   └── Main.unity
├── Prefabs/
│   ├── Player.prefab
│   └── Enemy.prefab
└── UI/
    └── MobileControls.prefab
```
