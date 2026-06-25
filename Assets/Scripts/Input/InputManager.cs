using UnityEngine;

public class InputManager : MonoBehaviour
{
    [SerializeField] private bool useMobileControls = true;
    
    public static InputManager Instance { get; private set; }

    private void Awake()
    {
        if (Instance != null && Instance != this)
        {
            Destroy(gameObject);
            return;
        }
        
        Instance = this;
    }

    private void Start()
    {
        // Auto-detect mobile or use setting
        #if UNITY_ANDROID || UNITY_IOS
        useMobileControls = true;
        #else
        useMobileControls = false;
        #endif
    }

    /// <summary>
    /// Get horizontal input (-1, 0, or 1)
    /// </summary>
    public float GetHorizontalInput()
    {
        if (useMobileControls)
        {
            return GetMobileHorizontalInput();
        }
        else
        {
            return Input.GetAxis("Horizontal");
        }
    }

    /// <summary>
    /// Get jump input
    /// </summary>
    public bool GetJumpInput()
    {
        if (useMobileControls)
        {
            return false; // Handled by UI button
        }
        else
        {
            return Input.GetKeyDown(KeyCode.Space);
        }
    }

    /// <summary>
    /// Get attack input
    /// </summary>
    public bool GetAttackInput()
    {
        if (useMobileControls)
        {
            return false; // Handled by UI button
        }
        else
        {
            return Input.GetMouseButtonDown(0);
        }
    }

    /// <summary>
    /// Mobile horizontal input from virtual buttons
    /// </summary>
    private float GetMobileHorizontalInput()
    {
        // This will be set by the mobile UI buttons
        return MobileUIControls.Instance != null ? MobileUIControls.Instance.GetMovementInput() : 0f;
    }

    public void SetMobileControlsActive(bool active)
    {
        useMobileControls = active;
    }

    public bool IsMobileControlsActive => useMobileControls;
}
