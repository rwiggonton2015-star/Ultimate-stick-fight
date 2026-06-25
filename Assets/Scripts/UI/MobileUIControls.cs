using UnityEngine;
using UnityEngine.UI;

public class MobileUIControls : MonoBehaviour
{
    [SerializeField] private Button leftButton;
    [SerializeField] private Button rightButton;
    [SerializeField] private Button jumpButton;
    [SerializeField] private Button attackButton;
    
    private float horizontalInput = 0f;
    private PlayerController playerController;
    
    public static MobileUIControls Instance { get; private set; }

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
        playerController = FindObjectOfType<PlayerController>();
        
        // Only show mobile controls on mobile
        #if UNITY_ANDROID || UNITY_IOS
        gameObject.SetActive(true);
        #else
        gameObject.SetActive(false);
        #endif

        // Setup button listeners
        if (leftButton != null)
            leftButton.GetComponent<EventTrigger>().triggers.Add(CreatePointerEventTrigger(EventTriggerType.PointerDown, OnLeftPressed));
        
        if (rightButton != null)
            rightButton.GetComponent<EventTrigger>().triggers.Add(CreatePointerEventTrigger(EventTriggerType.PointerDown, OnRightPressed));
        
        if (jumpButton != null)
            jumpButton.onClick.AddListener(OnJumpPressed);
        
        if (attackButton != null)
            attackButton.onClick.AddListener(OnAttackPressed);
    }

    private void Update()
    {
        // Reset horizontal input each frame
        if (!Input.GetMouseButton(0))
        {
            horizontalInput = 0f;
        }
    }

    private void OnLeftPressed()
    {
        horizontalInput = -1f;
    }

    private void OnRightPressed()
    {
        horizontalInput = 1f;
    }

    private void OnJumpPressed()
    {
        if (playerController != null)
            playerController.Jump();
    }

    private void OnAttackPressed()
    {
        if (playerController != null)
            playerController.Attack();
    }

    public float GetMovementInput()
    {
        return horizontalInput;
    }

    private EventTrigger.Entry CreatePointerEventTrigger(EventTriggerType eventType, UnityEngine.Events.UnityAction callback)
    {
        var entry = new EventTrigger.Entry();
        entry.eventID = eventType;
        entry.callback.AddListener((data) => callback());
        return entry;
    }
}
