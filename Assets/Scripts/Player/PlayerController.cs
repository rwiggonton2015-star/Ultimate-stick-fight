using UnityEngine;

public class PlayerController : MonoBehaviour
{
    [SerializeField] private float moveSpeed = 5f;
    [SerializeField] private float jumpForce = 5f;
    [SerializeField] private float groundDrag = 5f;
    [SerializeField] private float airDrag = 2f;
    [SerializeField] private LayerMask groundLayer;
    
    private Rigidbody2D rb;
    private InputManager inputManager;
    private bool isGrounded;
    private float horizontalInput;
    private bool isFacingRight = true;

    private void Start()
    {
        rb = GetComponent<Rigidbody2D>();
        inputManager = InputManager.Instance;
        
        if (inputManager == null)
        {
            Debug.LogError("InputManager not found! Please add it to the scene.");
        }
    }

    private void Update()
    {
        // Get input from InputManager (handles both desktop and mobile)
        horizontalInput = inputManager.GetHorizontalInput();
        
        // Check if grounded
        isGrounded = Physics2D.OverlapCircle(transform.position + Vector3.down * 0.5f, 0.1f, groundLayer);
        
        // Jump input
        if (inputManager.GetJumpInput() && isGrounded)
        {
            Jump();
        }
        
        // Attack input
        if (inputManager.GetAttackInput())
        {
            Attack();
        }
        
        // Flip sprite based on direction
        if (horizontalInput > 0 && !isFacingRight)
            Flip();
        else if (horizontalInput < 0 && isFacingRight)
            Flip();
    }

    private void FixedUpdate()
    {
        // Apply horizontal movement
        rb.velocity = new Vector2(horizontalInput * moveSpeed, rb.velocity.y);
        
        // Apply drag
        rb.drag = isGrounded ? groundDrag : airDrag;
    }

    public void Jump()
    {
        if (isGrounded)
        {
            rb.velocity = new Vector2(rb.velocity.x, 0);
            rb.AddForce(Vector2.up * jumpForce, ForceMode2D.Impulse);
        }
    }

    public void Attack()
    {
        Debug.Log("Player attacking!");
        // Attack logic will be added later
    }

    private void Flip()
    {
        isFacingRight = !isFacingRight;
        transform.localScale = new Vector3(-transform.localScale.x, transform.localScale.y, transform.localScale.z);
    }

    public bool IsGrounded => isGrounded;
    public bool IsFacingRight => isFacingRight;
}
