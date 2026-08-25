from datetime import datetime, timezone
from zoneinfo import ZoneInfo

PHT = ZoneInfo("Asia/Manila")


def get_utc_now() -> datetime:
    return datetime.now(timezone.utc)


def get_pht_now() -> datetime:
    return datetime.now(PHT)