"""Narration lines, one per slide, in slide order. 'full' for the full guides, 'short' for the quick tours."""

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
    # 8 support
    dict(full="Step seven: need help? Tap Support. Type the problem, or send a screenshot. "
              "It goes straight to the support team, and you get a ticket number.",
         short="Need help? Tap Support, and you get a ticket number."),
    # 9 mismatch
    dict(full="If your payment can't be found in the bank statement, you'll be told right away. "
              "Just reply with the correct reference number, or a clearer screenshot.",
         short="If a payment doesn't match, just send the correct reference number."),
    # 10 reminders
    dict(full="Still owe something? You'll get a friendly reminder. And for dues a month or more overdue, "
              "a payment reminder P D F.",
         short="Still owe? You'll get a friendly reminder."),
    # 11 help / close
    dict(full="Not sure what to send? Send HELP to see everything you can do. "
              "And send MENU any time, to see your balance and start again.",
         short="Send HELP to see everything you can do."),
    # 12 end
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
    # 6 remind unpaid
    dict(full="Step five: remind the flats that still owe. Tap Unpaid to see them. "
              "Remind unpaid sends a short, polite message, asking them to pay, or to send their proof "
              "if they already have. Tap Send, and you get a summary.",
         short="Step five: tap Unpaid, then Remind unpaid. A polite reminder goes to every flat that owes."),
    # 7 notices
    dict(full="For dues a month or more overdue, send formal payment reminder notices as P D F. "
              "Or download all the notices in one file, to print or forward.",
         short="Or send formal overdue notices, as P D F."),
    # 8 no dues
    dict(full="Reports: No dues receipts shows every fully paid flat. Download all their receipts in one P D F.",
         short="No dues receipts: every paid flat, in one P D F."),
    # 9 proof alert
    dict(full="When a resident sends a payment proof, every admin sees it, next to what the bank statement shows. "
              "If it doesn't match, tap Did not match, and the resident is asked again.",
         short="Every payment proof comes to you, with what the bank shows."),
    # 10 join alert
    dict(full="When a new number asks to join, every admin gets the request: the name, the flat, "
              "and the last digits of the mobile. Approve them as owner or tenant, or reject.",
         short="Approve new residents, as owner or tenant."),
    # 11 settings
    dict(full="In Settings: flats and residents, through the setup Excel. The society's details, late fees, "
              "additional funds, the signature, admins, and your own name and role.",
         short="Settings: the setup Excel, late fees, admins, and more."),
    # 12 setup Excel (replaces "Update a resident 1/2")
    dict(full="To add or remove residents, tap Update setup Excel. You get today's setup as an Excel file: "
              "flats, maintenance, opening balances, and every resident, owner or tenant. "
              "Make your changes in the file, and send it back.",
         short="To add or remove residents, tap Update setup Excel, edit the file, and send it back."),
    # 13 send back and confirm (replaces "Update a resident 2/2")
    dict(full="Send the file back, and you see every change, line by line: residents added or removed, "
              "flats, and maintenance. Nothing is saved until you tap Confirm.",
         short="You see every change, line by line. Tap Confirm to save."),
    # 14 (old "Remove a resident": dropped from the videos, see RENDERED)
    dict(full="", short=""),
    # 15 resident mode
    dict(full="Live here too? Send RESIDENT to see exactly what residents see. Send ADMIN to go back.",
         short="Send RESIDENT to see what residents see."),
    # 16 support
    dict(full="Need help? Tap Support, describe the problem, and you get a ticket number.",
         short="Need help? Tap Support."),
    # 17 end
    dict(full="Upload. Check. Send. Your society's dues, done.",
         short="Upload. Check. Send. Done."),
]

VIDEOS = {
    # output name: (source file, script, which line, slide start times)
    "resident-guide-short": ("resident-guide-short-v3-4k.mp4", RESIDENT, "short",
        [0.0, 2.0, 8.2, 26.8, 32.6, 34.8, 50.2, 58.0, 68.0, 77.2, 87.0, 96.2, 104.6]),
    "resident-guide-full": ("resident-guide-full-v3-4k.mp4", RESIDENT, "full",
        [0.0, 4.0, 16.4, 53.8, 65.4, 69.8, 100.6, 116.0, 134.8, 153.0, 172.8, 191.4, 208.4]),
    "admin-guide-short": ("admin-guide-short-4k.mp4", ADMIN, "short",
        [0.0, 2.0, 10.0, 26.2, 42.4, 59.6, 66.6, 87.6, 104.0, 116.2, 127.6, 138.2, 148.0, 170.0, 188.2,
         206.6, 217.0, 228.4]),
    "admin-guide-full": ("admin-guide-full-4k.mp4", ADMIN, "full",
        [0.0, 4.0, 19.4, 50.8, 81.8, 114.6, 128.4, 169.0, 201.0, 224.0, 247.0, 268.0, 285.2, 328.2, 364.0,
         398.0, 418.8, 440.2]),
}

# Slides re-rendered from the website's updated guides (the selfie step was removed from joining).
# (guide, slide) -> frame weights, in order; frames are work/render/<guide>-<slide>/NN.png
RENDERED = {
    ("resident", 2): [1, .45, 1, 1, .45, 1, 1, .45, 1, .45, 1.8],
    ("admin", 10): [.45, 1, .7, 1, .45, 1.8],
    ("resident", 11): [1, .45, 2.5],   # the 2-minute chat close was removed too
    # Update a resident / Remove a resident were removed: residents change through the setup Excel
    ("admin", 11): [1, .7, .9, .7, 1, .45, 1, .7, 2.2],
    ("admin", 12): [1, .7, .9, .7, 1, .45, 2.2],
    ("admin", 13): [1, .45, 1, .7, 1, .45, 2.2],
    ("admin", 14): "skip",
}
