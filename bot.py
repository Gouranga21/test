from fbchat import Client
from fbchat.models import Message, ThreadType
import json

with open('fbstate.json', 'r') as f:
    fbstate_data = json.load(f)

class EchoBot(Client):
    def onMessage(self, author_id, message_object, thread_id, thread_type, **kwargs):
        msg = message_object.text.lower()
        if author_id == self.uid:
            return

        print(f"Received: {msg} from {thread_id}")

        if thread_type == ThreadType.GROUP:
            if any(word in msg for word in ["hi", "bot", "help"]):
                self.send(
                    Message(text="✅ Hello! I'm a test bot."),
                    thread_id=thread_id,
                    thread_type=thread_type
                )

bot = EchoBot("", "", session_cookies=fbstate_data)
print("🤖 Bot is running...")
bot.listen()
