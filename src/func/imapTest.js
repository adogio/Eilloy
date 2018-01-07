const a = {
    "mails": [{
        "queue": 2,
        "received": ["from mout.gmx.com ([74.208.4.200]) by mx.mail.com (mxgmxus001 [74.208.5.22]) with ESMTPS (Nemesis) id 0LkNaf-1f3bgF1YfT-00cNc7 for <eilloytest@mail.com>; Fri, 05 Jan 2018 21:57:16 +0100", "from [104.145.102.14] ([104.145.102.14]) by 3c-app-mailcom-lxa11.server.lan (via HTTP); Fri, 5 Jan 2018 21:57:16 +0100"],
        "returnPath": {
            "value": [{
                "address": "eilloytest@mail.com",
                "name": ""
            }],
            "html": "<span class=\"mp_address_group\"><a href=\"mailto:eilloytest@mail.com\" class=\"mp_address_email\">eilloytest@mail.com</a></span>",
            "text": "eilloytest@mail.com"
        },
        "messageId": "<trinity-6a70a97a-7207-4819-94ac-9609fc943728-1515185836253@3c-app-mailcom-lxa11>",
        "priority": "normal",
        "sensitivity": "Normal",
        "date": "2018-01-05T20:57:16.000Z",
        "subject": "123",
        "from": "eilloy test <eilloytest@mail.com>",
        "to": "eilloytest@mail.com",
        "content": "<html><head></head><body><div style=\"font-family: Verdana;font-size: 12.0px;\"><div>13</div></div></body></html>\n"
    }, {
        "queue": 4,
        "received": ["from mout.gmx.com ([74.208.4.200]) by mx.mail.com (mxgmxus001 [74.208.5.22]) with ESMTPS (Nemesis) id 0M7qoo-1ekvpb3dom-00vPTP for <eilloytest@mail.com>; Sat, 06 Jan 2018 05:41:39 +0100", "from [104.145.102.14] ([104.145.102.14]) by 3c-app-mailcom-lxa11.server.lan (via HTTP); Sat, 6 Jan 2018 05:41:39 +0100"],
        "returnPath": {
            "value": [{
                "address": "eilloytest@mail.com",
                "name": ""
            }],
            "html": "<span class=\"mp_address_group\"><a href=\"mailto:eilloytest@mail.com\" class=\"mp_address_email\">eilloytest@mail.com</a></span>",
            "text": "eilloytest@mail.com"
        },
        "messageId": "<trinity-e2f3bbb6-2b64-4a78-a2bb-7e054bf3cd64-1515213699649@3c-app-mailcom-lxa11>",
        "priority": "normal",
        "sensitivity": "Normal",
        "date": "2018-01-06T04:41:39.000Z",
        "subject": "test both attachment and text",
        "from": "eilloy test <eilloytest@mail.com>",
        "to": "eilloytest@mail.com",
        "attachment": {
            "fileName": "下载.jpg",
            "contentType": "image/jpeg"
        },
        "content": "<html><head></head><body><div style=\"font-family: Verdana;font-size: 12.0px;\"><div>here is the text</div></div></body></html>"
    }, {
        "queue": 5,
        "received": ["from mout.gmx.com ([74.208.4.201]) by mx.mail.com (mxgmxus007 [74.208.5.22]) with ESMTPS (Nemesis) id 0MePU1-1eFidb0UzX-00QAxT for <eilloytest@mail.com>; Sat, 06 Jan 2018 06:28:16 +0100", "from [104.145.102.14] ([104.145.102.14]) by 3c-app-mailcom-lxa11.server.lan (via HTTP); Sat, 6 Jan 2018 06:28:15 +0100"],
        "returnPath": {
            "value": [{
                "address": "eilloytest@mail.com",
                "name": ""
            }],
            "html": "<span class=\"mp_address_group\"><a href=\"mailto:eilloytest@mail.com\" class=\"mp_address_email\">eilloytest@mail.com</a></span>",
            "text": "eilloytest@mail.com"
        },
        "messageId": "<trinity-cfcc4d1c-3f65-412a-9fd6-b3f7addd2877-1515216495915@3c-app-mailcom-lxa11>",
        "priority": "normal",
        "sensitivity": "Normal",
        "date": "2018-01-06T05:28:15.000Z",
        "subject": "test script",
        "from": "eilloy test <eilloytest@mail.com>",
        "to": "eilloytest@mail.com",
        "content": "<html><head></head><body><div style=\"font-family: Verdana;font-size: 12.0px;\"><div>&lt;script&gt;alert(123)&lt;/script&gt;</div></div></body></html>\n"
    }, {
        "queue": 9,
        "received": ["from mout.gmx.com ([74.208.4.201]) by mx.mail.com (mxgmxus007 [74.208.5.20]) with ESMTPS (Nemesis) id 0MdrFj-1eExNS22xR-00PcyF for <eilloytest@mail.com>; Sun, 07 Jan 2018 01:16:23 +0100", "from [127.0.0.1] ([104.145.102.14]) by mail.gmx.com (mrgmxus001 [74.208.5.15]) with ESMTPSA (Nemesis) id 0MQiFP-1eS6Xa179h-00U4g3 for <eilloytest@mail.com>; Sun, 07 Jan 2018 01:16:23 +0100"],
        "returnPath": {
            "value": [{
                "address": "eilloytest@mail.com",
                "name": ""
            }],
            "html": "<span class=\"mp_address_group\"><a href=\"mailto:eilloytest@mail.com\" class=\"mp_address_email\">eilloytest@mail.com</a></span>",
            "text": "eilloytest@mail.com"
        },
        "messageId": "<090fe0c2-8da8-7cee-a523-8c4386fec214@mail.com>",
        "date": "2018-01-07T00:16:25.000Z",
        "subject": "sendTest",
        "from": "👻 <eilloytest@mail.com>",
        "to": "eilloytest@mail.com",
        "content": "<h1>BIG</h1>\n"
    }],
    "name": "INBOX",
    "flags": ["\\Answered", "\\Flagged", "\\Deleted", "\\Seen", "\\Draft"],
    "readOnly": true,
    "uidLimit": 1515185399,
    "uidNext": 10,
    "premFlags": ["\\Answered", "\\Flagged", "\\Draft", "\\Deleted", "\\Seen"],
    "keywords": [],
    "newKeywords": true,
    "persistentUids": true,
    "nomodseq": false,
    "newMessages": 9,
    "totalMessages": 9
};

export default a;