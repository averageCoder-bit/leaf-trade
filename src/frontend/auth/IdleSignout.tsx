import { useEffect } from "react";
import { useClerk, useSession } from "@clerk/react";

const IDLE_TIMEOUT = 15 * 60 * 1000;
const CHECK_INTERVAL = 5000;
const ACTIVITY_THROTTLE = 2000;

export default function IdleSignout(): null {
  const { signOut } = useClerk();
  const { isSignedIn, session } = useSession();

  useEffect(() => {
    if (!isSignedIn || !session?.id) return;

    const storageKey = `leaftrade:lastActivity:${session.id}`;

    let isSigningOut = false;
    let lastWrite = 0;

    const getLastActivity = (): number => {
      return Number(localStorage.getItem(storageKey)) || 0;
    };

    // Initialize activity only if this session has no timestamp.
    if (!getLastActivity()) {
      localStorage.setItem(storageKey, String(Date.now()));
    }

    const handleIdle = async () => {
      if (isSigningOut) return;

      const inactiveFor = Date.now() - getLastActivity();

      if (inactiveFor < IDLE_TIMEOUT) return;

      isSigningOut = true;

      try {
        sessionStorage.setItem("idleLogout", "true");

        await signOut({ redirectUrl: "/login" });
      } catch (error) {
        sessionStorage.removeItem("idleLogout");
        isSigningOut = false;

        console.error("Automatic logout failed:", error);
      }
    };

    const resetActivity = () => {
      if (isSigningOut) return;

      const now = Date.now();

      // Do not revive a session that has already become idle.
      if (now - getLastActivity() >= IDLE_TIMEOUT) {
        void handleIdle();
        return;
      }

      // Avoid excessive localStorage writes.
      if (now - lastWrite < ACTIVITY_THROTTLE) return;

      lastWrite = now;
      localStorage.setItem(storageKey, String(now));
    };

    const events = [
      "pointerdown",
      "pointermove",
      "keydown",
      "scroll",
      "touchstart",
    ];

    events.forEach((event) => {
      window.addEventListener(event, resetActivity, {
        passive: true,
      });
    });

    // Check inactivity periodically.
    const interval = window.setInterval(() => {
      void handleIdle();
    }, CHECK_INTERVAL);

    // Check when returning to a background tab.
    const handleVisibility = () => {
      if (document.visibilityState === "visible") {
        resetActivity();
      }
    };

    document.addEventListener("visibilitychange", handleVisibility);

    window.addEventListener("focus", resetActivity);

    void handleIdle();

    return () => {
      window.clearInterval(interval);

      events.forEach((event) => {
        window.removeEventListener(event, resetActivity);
      });

      document.removeEventListener("visibilitychange", handleVisibility);

      window.removeEventListener("focus", resetActivity);
    };
  }, [isSignedIn, session?.id, signOut]);

  return null;
}
