
# Unofficial WhatsApp Client

## API Reference

Note: 'wid' stands for 'whatsapp id'.

#### Starts client

```http
  GET /api/whatsapp/init
```
None of the following endpoints will work if
client is not initialized.

#### Get current client info

```http
  GET /api/whatsapp/info
```

**Returns:** *object*

#### Get chat info 

```http
  GET /api/whatsapp/info/:wid
```
| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `wid`     | `string` | **Required**. Id of item to fetch |

**Returns:** *object*

#### Get all chats 

```http
  GET /api/whatsapp/chats
```
**Returns:** *array*

#### Get chat messages

```http
  GET /api/whatsapp/messages/:wid
```
| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `wid`     | `string` | **Required**. Id of item to fetch |

**Returns:** *array*

#### Get chat profile picture

```http
  GET /api/whatsapp/ppic/:wid
```
| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `wid`     | `string` | **Required**. Id of item to fetch |

**Returns:** *url*

#### Send message (*Incomplete*)
```http
  POST /api/whatsapp/sendmessage
```