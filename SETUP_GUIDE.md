# Setup Instructions for Mobile & Desktop Controls

## Scene Setup

1. **Create a new 2D Scene** called "Main"

2. **Add GameObjects:**
   - Create an empty GameObject called "Player"
     - Add a Sprite Renderer (draw a stick figure, or use a simple square)
     - Add a Rigidbody2D (Body Type: Dynamic, Gravity Scale: 1)
     - Add a BoxCollider2D (check "Is Trigger" OFF)
     - Add a CircleCollider2D for ground detection (check "Is Trigger" ON)
     - Add the PlayerController script
     - Add the PlayerAnimator script (optional if no animations yet)

   - Create a ground GameObject called "Ground"
     - Add a Sprite Renderer
     - Add a BoxCollider2D
     - Set Layer to "Ground"

3. **Create an empty GameObject called "Managers"**
   - Add GameManager script
   - Add InputManager script

4. **For Mobile Controls (Canvas):**
   - Right-click in Hierarchy → UI → Panel
   - This creates a Canvas
   - Create Buttons for: Left, Right, Jump, Attack
   - Position them at bottom of screen (Left/Right on sides, Jump/Attack on right)
   - Add the MobileUIControls script to the Canvas
   - Assign button references in the Inspector

5. **Set up Layers:**
   - Create a layer called "Ground"
   - Assign Ground objects to this layer
   - In PlayerController inspector, set Ground Layer to "Ground"

## Next Steps
- Create simple stick figure sprites
- Add animation states for walking, jumping, idle
- Add enemies and attack collision detection
