using UnityEngine;

public class PlayerAnimator : MonoBehaviour
{
    private PlayerController playerController;
    private Animator animator;
    private Rigidbody2D rb;

    private void Start()
    {
        playerController = GetComponent<PlayerController>();
        animator = GetComponent<Animator>();
        rb = GetComponent<Rigidbody2D>();
    }

    private void Update()
    {
        // Update animation parameters
        float horizontalVelocity = Mathf.Abs(rb.velocity.x);
        animator.SetFloat("Speed", horizontalVelocity);
        animator.SetBool("IsGrounded", playerController.IsGrounded);
        animator.SetFloat("VerticalVelocity", rb.velocity.y);
    }
}
