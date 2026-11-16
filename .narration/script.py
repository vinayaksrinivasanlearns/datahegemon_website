"""Narration lines, one per guide slide, in the order of public/guides/<guide>-steps.html.
'full' is for the full guides, 'short' for the quick tours."""

RESIDENT = [
    # 0 title
    dict(full="Maintenance dues, on WhatsApp. Here's how it works for residents.",
         short="Maintenance dues, on WhatsApp."),
    # 1 join
    dict(full="Step one: join your society. Scan the resident QR code on the notice board. "
              "WhatsApp opens with the join message ready. Tap send, and you're linked to your flat.",
         short="Scan the society QR code, tap send, and you're linked to your flat."),
    # 2 register with name and flat
    dict(full="New number, not on the list yet? No problem. The bot asks just two things: your name, "
              "and your flat number. The society admin approves you as owner or tenant, and you get a message "
              "the moment you're registered.",
         short="New number? Just send your name and flat number. "
               "Once the admin approves, you're registered."),
    # 3 balance
    dict(full="Step two: see your balance. Just send hi, any time. You see your flat, the month, and the amount due.",
         short="Send hi, any time, to see your balance."),
    # 4 pay
    dict(full="Step three: pay the way your society asks.",
         short="Pay your society directly."),
    # 5 I've paid
    dict(full="Step four: tell the association you've paid. Tap I've paid, and send a screenshot, "
              "a PDF receipt, or simply type the U T R number. Add a short note if you like. "
              "Your proof is saved, and matched when the society checks the bank statement.",
         short="Then tap I've paid, and send a screenshot, a PDF, or the U T R number. "
               "It's matched with the bank statement."),
    # 6 receipt
    dict(full="Step five: get your receipt. Once your payment is recorded, "
              "the receipt P D F arrives on WhatsApp, automatically.",
         short="Your receipt P D F arrives on WhatsApp, automatically."),
    # 7 old receipts
    dict(full="Step six: need an old receipt? Tap Receipts. Pick any receipt from the last three months, "
              "or tap More for the whole year.",
         short="Tap Receipts to download any old receipt."),
    # 8 support (via More)
    dict(full="Step seven: need help? Tap More, then Support. Type the problem, or send a screenshot. "
              "It goes straight to the support team, and you get a ticket number.",
         short="Need help? Tap More, then Support, and you get a ticket number."),
    # 9 NOC
    dict(full="Step eight: selling your flat, or moving out? Tap More, then Request NOC. "
              "If nothing is due on your flat, choose what it's for, and the request goes to the admins. "
              "Once they issue it, your numbered N O C arrives as a P D F. "
              "Print it, and give the slip at the bottom to security when you leave.",
         short="Selling or moving out? Tap More, then Request NOC. "
               "Your N O C arrives as a P D F, once the admins issue it."),
    # 10 mismatch
    dict(full="If your payment can't be found in the bank statement, you'll be told right away. "
              "Just reply with the correct reference number, or a clearer screenshot.",
         short="If a payment doesn't match, just send the correct reference number."),
    # 11 reminders
    dict(full="Still owe something? You'll get a friendly reminder. And for dues a month or more overdue, "
              "a payment reminder P D F.",
         short="Still owe? You'll get a friendly reminder."),
    # 12 help
    dict(full="Not sure what to send? Send HELP to see everything you can do. "
              "And send MENU any time, to see your balance and start again.",
         short="Send HELP to see everything you can do."),
    # 13 end
    dict(full="That's it. Send hi to your society's WhatsApp number, any time.",
         short="That's it. Just send hi."),
]

ADMIN = [
    # 0 title
    dict(full="Maintenance dues, on WhatsApp. The guide for committee admins.",
         short="The guide for committee admins."),
    # 1 admin menu
    dict(full="Send ADMIN, any time. You get the dashboard: the month, what's collected, what's pending, "
              "and every flat. Tap Menu for everything you can do.",
         short="Send ADMIN for the dashboard. Tap Menu for everything else."),
    # 2 upload statement
    dict(full="Monthly work, step one: upload the bank statement. Send it as a PDF, an Excel file, or a CSV. "
              "Several files are fine, and a payment that appears twice is counted only once. "
              "The bot reads it, matches every payment proof residents sent, and gives you a summary.",
         short="Step one: upload the bank statement, as PDF, Excel or CSV. "
               "Every payment is matched for you."),
    # 3 check dues
    dict(full="Step two: check the maintenance dues. You see a picture of the month: who paid, who hasn't, "
              "and the rows to check, marked in yellow. Download the Excel to review and correct it.",
         short="Step two: check the maintenance dues. Rows to check are marked in yellow."),
    # 4 import
    dict(full="Step three: import the finalized Excel. Send back the file you checked. "
              "You see a summary first. Nothing is saved until you tap Confirm. "
              "Then payments are saved, and receipts are made.",
         short="Step three: send back the checked Excel, and tap Confirm. Receipts are made."),
    # 5 send receipts
    dict(full="Step four: tap Send receipts. Every payer gets their receipt P D F on WhatsApp.",
         short="Step four: tap Send receipts."),
    # 6 fix a receipt
    dict(full="A receipt went wrong? Tap Menu, then Fix a receipt, and type the receipt number. "
              "Wrong flat, wrong month, wrong amount, or not a dues payment at all. "
              "Here, the payment belongs to B two zero one. You see each flat's balance, before and after, "
              "and nothing changes until you tap Confirm. The old receipt is cancelled, with the reason, "
              "a corrected one is made, and the resident is told.",
         short="A receipt went wrong? Tap Fix a receipt. Check the balances before and after, and tap Confirm. "
               "A corrected receipt is made."),
    # 7 remind unpaid
    dict(full="Step five: remind the flats that still owe. Tap Unpaid to see them. "
              "Remind unpaid sends a short, polite message, asking them to pay, or to send their proof "
              "if they already have. Tap Send, and you get a summary.",
         short="Step five: tap Unpaid, then Remind unpaid. A polite reminder goes to every flat that owes."),
    # 8 notices
    dict(full="For dues a month or more overdue, send formal payment reminder notices as P D F. "
              "Or download all the notices in one file, to print or forward.",
         short="Or send formal overdue notices, as P D F."),
    # 9 no dues
    dict(full="Reports: No dues receipts shows every fully paid flat. Download all their receipts in one P D F.",
         short="No dues receipts: every paid flat, in one P D F."),
    # 10 proof alert
    dict(full="When a resident sends a payment proof, every admin sees it, next to what the bank statement shows. "
              "If it doesn't match, tap Did not match, and the resident is asked again.",
         short="Every payment proof comes to you, with what the bank shows."),
    # 11 join alert
    dict(full="When a new number asks to join, every admin gets the request: the name, the flat, "
              "and the last digits of the mobile. Approve them as owner or tenant, or reject.",
         short="Approve new residents, as owner or tenant."),
    # 12 NOC request
    dict(full="When a resident asks for an N O C, every admin gets the request: the flat, what it's for, "
              "and its dues. Only a flat with no dues can ask. Tap Issue NOC. "
              "You get the numbered P D F, and the resident gets their copy on WhatsApp.",
         short="A resident asks for an N O C? Tap Issue NOC, and the P D F goes to them."),
    # 13 settings
    dict(full="In Settings: flats and residents, through the setup Excel. The society's details, late fees, "
              "additional funds, the signature, admins, and your own name and role.",
         short="Settings: the setup Excel, late fees, admins, and more."),
    # 14 setup Excel
    dict(full="To add or remove residents, tap Update setup Excel. You get today's setup as an Excel file: "
              "flats, maintenance, opening balances, and every resident, owner or tenant. "
              "Make your changes in the file, and send it back.",
         short="To add or remove residents, tap Update setup Excel, edit the file, and send it back."),
    # 15 send back and confirm
    dict(full="Send the file back, and you see every change, line by line: residents added or removed, "
              "flats, and maintenance. Nothing is saved until you tap Confirm.",
         short="You see every change, line by line. Tap Confirm to save."),
    # 16 resident mode
    dict(full="Live here too? Send RESIDENT to see exactly what residents see. Send ADMIN to go back.",
         short="Send RESIDENT to see what residents see."),
    # 17 support
    dict(full="Need help? Tap Menu, then Support. Describe the problem, and you get a ticket number.",
         short="Need help? Tap Menu, then Support."),
    # 18 end
    dict(full="Upload. Check. Send. Your society's dues, done.",
         short="Upload. Check. Send. Done."),
]

# output name: (guide, script, which line)
VIDEOS = {
    "resident-guide-short": ("resident", RESIDENT, "short"),
    "resident-guide-full": ("resident", RESIDENT, "full"),
    "admin-guide-short": ("admin", ADMIN, "short"),
    "admin-guide-full": ("admin", ADMIN, "full"),
}
