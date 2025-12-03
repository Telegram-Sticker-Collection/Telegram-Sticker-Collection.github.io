# Telegram-Sticker-Collection

https://telegram-sticker-collection.github.io

## Website TODO
- [ ] Add loading

## Bot TODO
- [ ] Fallback to MTProto bot: The bot API returns 404 for some files. We can list them by `grep`ing `null` in the `Stickers/info` directory. The sloutions seems to be reimplementing the bot with MTProto-based libraries (e.g. TDLib or Telethon).
