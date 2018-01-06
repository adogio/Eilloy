const a = {
    "mails": [{
        "queue": 2,
        "subject": "12123123",
        "from": "eilloy test <eilloytest@mail.com>",
        "to": "eilloytest@mail.com",
        "content": "<html><head></head><body><div style=\"font-family: Verdana;font-size: 12.0px;\"><div>13</div></div></body></html>\n"
    }, {
        "queue": 4,
        "subject": "test both attachment and text",
        "from": "eilloy test <eilloytest@mail.com>",
        "to": "eilloytest@mail.com",
        "attachment": "下载.jpg",
        "content": "<html><head></head><body><div style=\"font-family: Verdana;font-size: 12.0px;\"><div>here is the text</div></div></body></html>"
    }, {
        "queue": 5,
        "subject": "test script",
        "from": "eilloy test <eilloytest@mail.com>",
        "to": "eilloytest@mail.com",
        "content": "<html><head></head><body><div style=\"font-family: Verdana;font-size: 12.0px;\"><div>&lt;script&gt;alert(123)&lt;/script&gt;</div></div></body></html>\n"
    }],
    "name": "INBOX",
    "flags": ["\\Answered", "\\Flagged", "\\Deleted", "\\Seen", "\\Draft"],
    "readOnly": true,
    "uidLimit": 1515185399,
    "uidNext": 6,
    "premFlags": ["\\Answered", "\\Flagged", "\\Draft", "\\Deleted", "\\Seen"],
    "keywords": [],
    "newKeywords": true,
    "persistentUids": true,
    "nomodseq": false,
    "newMessages": 5,
    "totalMessages": 5
};

export default a;