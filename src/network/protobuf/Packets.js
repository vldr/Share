/*eslint-disable block-scoped-var, id-length, no-control-regex, no-magic-numbers, no-prototype-builtins, no-redeclare, no-shadow, no-var, sort-vars*/
import * as $protobuf from "protobufjs/minimal";

// Common aliases
const $Reader = $protobuf.Reader, $Writer = $protobuf.Writer, $util = $protobuf.util;

// Exported root namespace
const $root = $protobuf.roots["default"] || ($protobuf.roots["default"] = {});

export const Handshake = $root.Handshake = (() => {

    /**
     * Properties of a Handshake.
     * @exports IHandshake
     * @interface IHandshake
     * @property {Uint8Array} publicKey Handshake publicKey
     * @property {Uint8Array} signature Handshake signature
     */

    /**
     * Constructs a new Handshake.
     * @exports Handshake
     * @classdesc Represents a Handshake.
     * @implements IHandshake
     * @constructor
     * @param {IHandshake=} [properties] Properties to set
     */
    function Handshake(properties) {
        if (properties)
            for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                if (properties[keys[i]] != null)
                    this[keys[i]] = properties[keys[i]];
    }

    /**
     * Handshake publicKey.
     * @member {Uint8Array} publicKey
     * @memberof Handshake
     * @instance
     */
    Handshake.prototype.publicKey = $util.newBuffer([]);

    /**
     * Handshake signature.
     * @member {Uint8Array} signature
     * @memberof Handshake
     * @instance
     */
    Handshake.prototype.signature = $util.newBuffer([]);

    /**
     * Creates a new Handshake instance using the specified properties.
     * @function create
     * @memberof Handshake
     * @static
     * @param {IHandshake=} [properties] Properties to set
     * @returns {Handshake} Handshake instance
     */
    Handshake.create = function create(properties) {
        return new Handshake(properties);
    };

    /**
     * Encodes the specified Handshake message. Does not implicitly {@link Handshake.verify|verify} messages.
     * @function encode
     * @memberof Handshake
     * @static
     * @param {IHandshake} message Handshake message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    Handshake.encode = function encode(message, writer) {
        if (!writer)
            writer = $Writer.create();
        writer.uint32(/* id 1, wireType 2 =*/10).bytes(message.publicKey);
        writer.uint32(/* id 2, wireType 2 =*/18).bytes(message.signature);
        return writer;
    };

    /**
     * Encodes the specified Handshake message, length delimited. Does not implicitly {@link Handshake.verify|verify} messages.
     * @function encodeDelimited
     * @memberof Handshake
     * @static
     * @param {IHandshake} message Handshake message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    Handshake.encodeDelimited = function encodeDelimited(message, writer) {
        return this.encode(message, writer).ldelim();
    };

    /**
     * Decodes a Handshake message from the specified reader or buffer.
     * @function decode
     * @memberof Handshake
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @param {number} [length] Message length if known beforehand
     * @returns {Handshake} Handshake
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    Handshake.decode = function decode(reader, length) {
        if (!(reader instanceof $Reader))
            reader = $Reader.create(reader);
        let end = length === undefined ? reader.len : reader.pos + length, message = new $root.Handshake();
        while (reader.pos < end) {
            let tag = reader.uint32();
            switch (tag >>> 3) {
            case 1: {
                    message.publicKey = reader.bytes();
                    break;
                }
            case 2: {
                    message.signature = reader.bytes();
                    break;
                }
            default:
                reader.skipType(tag & 7);
                break;
            }
        }
        if (!message.hasOwnProperty("publicKey"))
            throw $util.ProtocolError("missing required 'publicKey'", { instance: message });
        if (!message.hasOwnProperty("signature"))
            throw $util.ProtocolError("missing required 'signature'", { instance: message });
        return message;
    };

    /**
     * Decodes a Handshake message from the specified reader or buffer, length delimited.
     * @function decodeDelimited
     * @memberof Handshake
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @returns {Handshake} Handshake
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    Handshake.decodeDelimited = function decodeDelimited(reader) {
        if (!(reader instanceof $Reader))
            reader = new $Reader(reader);
        return this.decode(reader, reader.uint32());
    };

    /**
     * Verifies a Handshake message.
     * @function verify
     * @memberof Handshake
     * @static
     * @param {Object.<string,*>} message Plain object to verify
     * @returns {string|null} `null` if valid, otherwise the reason why it is not
     */
    Handshake.verify = function verify(message) {
        if (typeof message !== "object" || message === null)
            return "object expected";
        if (!(message.publicKey && typeof message.publicKey.length === "number" || $util.isString(message.publicKey)))
            return "publicKey: buffer expected";
        if (!(message.signature && typeof message.signature.length === "number" || $util.isString(message.signature)))
            return "signature: buffer expected";
        return null;
    };

    /**
     * Creates a Handshake message from a plain object. Also converts values to their respective internal types.
     * @function fromObject
     * @memberof Handshake
     * @static
     * @param {Object.<string,*>} object Plain object
     * @returns {Handshake} Handshake
     */
    Handshake.fromObject = function fromObject(object) {
        if (object instanceof $root.Handshake)
            return object;
        let message = new $root.Handshake();
        if (object.publicKey != null)
            if (typeof object.publicKey === "string")
                $util.base64.decode(object.publicKey, message.publicKey = $util.newBuffer($util.base64.length(object.publicKey)), 0);
            else if (object.publicKey.length >= 0)
                message.publicKey = object.publicKey;
        if (object.signature != null)
            if (typeof object.signature === "string")
                $util.base64.decode(object.signature, message.signature = $util.newBuffer($util.base64.length(object.signature)), 0);
            else if (object.signature.length >= 0)
                message.signature = object.signature;
        return message;
    };

    /**
     * Creates a plain object from a Handshake message. Also converts values to other types if specified.
     * @function toObject
     * @memberof Handshake
     * @static
     * @param {Handshake} message Handshake
     * @param {$protobuf.IConversionOptions} [options] Conversion options
     * @returns {Object.<string,*>} Plain object
     */
    Handshake.toObject = function toObject(message, options) {
        if (!options)
            options = {};
        let object = {};
        if (options.defaults) {
            if (options.bytes === String)
                object.publicKey = "";
            else {
                object.publicKey = [];
                if (options.bytes !== Array)
                    object.publicKey = $util.newBuffer(object.publicKey);
            }
            if (options.bytes === String)
                object.signature = "";
            else {
                object.signature = [];
                if (options.bytes !== Array)
                    object.signature = $util.newBuffer(object.signature);
            }
        }
        if (message.publicKey != null && message.hasOwnProperty("publicKey"))
            object.publicKey = options.bytes === String ? $util.base64.encode(message.publicKey, 0, message.publicKey.length) : options.bytes === Array ? Array.prototype.slice.call(message.publicKey) : message.publicKey;
        if (message.signature != null && message.hasOwnProperty("signature"))
            object.signature = options.bytes === String ? $util.base64.encode(message.signature, 0, message.signature.length) : options.bytes === Array ? Array.prototype.slice.call(message.signature) : message.signature;
        return object;
    };

    /**
     * Converts this Handshake to JSON.
     * @function toJSON
     * @memberof Handshake
     * @instance
     * @returns {Object.<string,*>} JSON object
     */
    Handshake.prototype.toJSON = function toJSON() {
        return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
    };

    /**
     * Gets the default type url for Handshake
     * @function getTypeUrl
     * @memberof Handshake
     * @static
     * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
     * @returns {string} The default type url
     */
    Handshake.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
        if (typeUrlPrefix === undefined) {
            typeUrlPrefix = "type.googleapis.com";
        }
        return typeUrlPrefix + "/Handshake";
    };

    return Handshake;
})();

export const HandshakeResponse = $root.HandshakeResponse = (() => {

    /**
     * Properties of a HandshakeResponse.
     * @exports IHandshakeResponse
     * @interface IHandshakeResponse
     * @property {Uint8Array} publicKey HandshakeResponse publicKey
     * @property {Uint8Array} signature HandshakeResponse signature
     */

    /**
     * Constructs a new HandshakeResponse.
     * @exports HandshakeResponse
     * @classdesc Represents a HandshakeResponse.
     * @implements IHandshakeResponse
     * @constructor
     * @param {IHandshakeResponse=} [properties] Properties to set
     */
    function HandshakeResponse(properties) {
        if (properties)
            for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                if (properties[keys[i]] != null)
                    this[keys[i]] = properties[keys[i]];
    }

    /**
     * HandshakeResponse publicKey.
     * @member {Uint8Array} publicKey
     * @memberof HandshakeResponse
     * @instance
     */
    HandshakeResponse.prototype.publicKey = $util.newBuffer([]);

    /**
     * HandshakeResponse signature.
     * @member {Uint8Array} signature
     * @memberof HandshakeResponse
     * @instance
     */
    HandshakeResponse.prototype.signature = $util.newBuffer([]);

    /**
     * Creates a new HandshakeResponse instance using the specified properties.
     * @function create
     * @memberof HandshakeResponse
     * @static
     * @param {IHandshakeResponse=} [properties] Properties to set
     * @returns {HandshakeResponse} HandshakeResponse instance
     */
    HandshakeResponse.create = function create(properties) {
        return new HandshakeResponse(properties);
    };

    /**
     * Encodes the specified HandshakeResponse message. Does not implicitly {@link HandshakeResponse.verify|verify} messages.
     * @function encode
     * @memberof HandshakeResponse
     * @static
     * @param {IHandshakeResponse} message HandshakeResponse message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    HandshakeResponse.encode = function encode(message, writer) {
        if (!writer)
            writer = $Writer.create();
        writer.uint32(/* id 1, wireType 2 =*/10).bytes(message.publicKey);
        writer.uint32(/* id 2, wireType 2 =*/18).bytes(message.signature);
        return writer;
    };

    /**
     * Encodes the specified HandshakeResponse message, length delimited. Does not implicitly {@link HandshakeResponse.verify|verify} messages.
     * @function encodeDelimited
     * @memberof HandshakeResponse
     * @static
     * @param {IHandshakeResponse} message HandshakeResponse message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    HandshakeResponse.encodeDelimited = function encodeDelimited(message, writer) {
        return this.encode(message, writer).ldelim();
    };

    /**
     * Decodes a HandshakeResponse message from the specified reader or buffer.
     * @function decode
     * @memberof HandshakeResponse
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @param {number} [length] Message length if known beforehand
     * @returns {HandshakeResponse} HandshakeResponse
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    HandshakeResponse.decode = function decode(reader, length) {
        if (!(reader instanceof $Reader))
            reader = $Reader.create(reader);
        let end = length === undefined ? reader.len : reader.pos + length, message = new $root.HandshakeResponse();
        while (reader.pos < end) {
            let tag = reader.uint32();
            switch (tag >>> 3) {
            case 1: {
                    message.publicKey = reader.bytes();
                    break;
                }
            case 2: {
                    message.signature = reader.bytes();
                    break;
                }
            default:
                reader.skipType(tag & 7);
                break;
            }
        }
        if (!message.hasOwnProperty("publicKey"))
            throw $util.ProtocolError("missing required 'publicKey'", { instance: message });
        if (!message.hasOwnProperty("signature"))
            throw $util.ProtocolError("missing required 'signature'", { instance: message });
        return message;
    };

    /**
     * Decodes a HandshakeResponse message from the specified reader or buffer, length delimited.
     * @function decodeDelimited
     * @memberof HandshakeResponse
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @returns {HandshakeResponse} HandshakeResponse
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    HandshakeResponse.decodeDelimited = function decodeDelimited(reader) {
        if (!(reader instanceof $Reader))
            reader = new $Reader(reader);
        return this.decode(reader, reader.uint32());
    };

    /**
     * Verifies a HandshakeResponse message.
     * @function verify
     * @memberof HandshakeResponse
     * @static
     * @param {Object.<string,*>} message Plain object to verify
     * @returns {string|null} `null` if valid, otherwise the reason why it is not
     */
    HandshakeResponse.verify = function verify(message) {
        if (typeof message !== "object" || message === null)
            return "object expected";
        if (!(message.publicKey && typeof message.publicKey.length === "number" || $util.isString(message.publicKey)))
            return "publicKey: buffer expected";
        if (!(message.signature && typeof message.signature.length === "number" || $util.isString(message.signature)))
            return "signature: buffer expected";
        return null;
    };

    /**
     * Creates a HandshakeResponse message from a plain object. Also converts values to their respective internal types.
     * @function fromObject
     * @memberof HandshakeResponse
     * @static
     * @param {Object.<string,*>} object Plain object
     * @returns {HandshakeResponse} HandshakeResponse
     */
    HandshakeResponse.fromObject = function fromObject(object) {
        if (object instanceof $root.HandshakeResponse)
            return object;
        let message = new $root.HandshakeResponse();
        if (object.publicKey != null)
            if (typeof object.publicKey === "string")
                $util.base64.decode(object.publicKey, message.publicKey = $util.newBuffer($util.base64.length(object.publicKey)), 0);
            else if (object.publicKey.length >= 0)
                message.publicKey = object.publicKey;
        if (object.signature != null)
            if (typeof object.signature === "string")
                $util.base64.decode(object.signature, message.signature = $util.newBuffer($util.base64.length(object.signature)), 0);
            else if (object.signature.length >= 0)
                message.signature = object.signature;
        return message;
    };

    /**
     * Creates a plain object from a HandshakeResponse message. Also converts values to other types if specified.
     * @function toObject
     * @memberof HandshakeResponse
     * @static
     * @param {HandshakeResponse} message HandshakeResponse
     * @param {$protobuf.IConversionOptions} [options] Conversion options
     * @returns {Object.<string,*>} Plain object
     */
    HandshakeResponse.toObject = function toObject(message, options) {
        if (!options)
            options = {};
        let object = {};
        if (options.defaults) {
            if (options.bytes === String)
                object.publicKey = "";
            else {
                object.publicKey = [];
                if (options.bytes !== Array)
                    object.publicKey = $util.newBuffer(object.publicKey);
            }
            if (options.bytes === String)
                object.signature = "";
            else {
                object.signature = [];
                if (options.bytes !== Array)
                    object.signature = $util.newBuffer(object.signature);
            }
        }
        if (message.publicKey != null && message.hasOwnProperty("publicKey"))
            object.publicKey = options.bytes === String ? $util.base64.encode(message.publicKey, 0, message.publicKey.length) : options.bytes === Array ? Array.prototype.slice.call(message.publicKey) : message.publicKey;
        if (message.signature != null && message.hasOwnProperty("signature"))
            object.signature = options.bytes === String ? $util.base64.encode(message.signature, 0, message.signature.length) : options.bytes === Array ? Array.prototype.slice.call(message.signature) : message.signature;
        return object;
    };

    /**
     * Converts this HandshakeResponse to JSON.
     * @function toJSON
     * @memberof HandshakeResponse
     * @instance
     * @returns {Object.<string,*>} JSON object
     */
    HandshakeResponse.prototype.toJSON = function toJSON() {
        return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
    };

    /**
     * Gets the default type url for HandshakeResponse
     * @function getTypeUrl
     * @memberof HandshakeResponse
     * @static
     * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
     * @returns {string} The default type url
     */
    HandshakeResponse.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
        if (typeUrlPrefix === undefined) {
            typeUrlPrefix = "type.googleapis.com";
        }
        return typeUrlPrefix + "/HandshakeResponse";
    };

    return HandshakeResponse;
})();

export const List = $root.List = (() => {

    /**
     * Properties of a List.
     * @exports IList
     * @interface IList
     * @property {Array.<List.IEntry>|null} [entries] List entries
     */

    /**
     * Constructs a new List.
     * @exports List
     * @classdesc Represents a List.
     * @implements IList
     * @constructor
     * @param {IList=} [properties] Properties to set
     */
    function List(properties) {
        this.entries = [];
        if (properties)
            for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                if (properties[keys[i]] != null)
                    this[keys[i]] = properties[keys[i]];
    }

    /**
     * List entries.
     * @member {Array.<List.IEntry>} entries
     * @memberof List
     * @instance
     */
    List.prototype.entries = $util.emptyArray;

    /**
     * Creates a new List instance using the specified properties.
     * @function create
     * @memberof List
     * @static
     * @param {IList=} [properties] Properties to set
     * @returns {List} List instance
     */
    List.create = function create(properties) {
        return new List(properties);
    };

    /**
     * Encodes the specified List message. Does not implicitly {@link List.verify|verify} messages.
     * @function encode
     * @memberof List
     * @static
     * @param {IList} message List message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    List.encode = function encode(message, writer) {
        if (!writer)
            writer = $Writer.create();
        if (message.entries != null && message.entries.length)
            for (let i = 0; i < message.entries.length; ++i)
                $root.List.Entry.encode(message.entries[i], writer.uint32(/* id 1, wireType 2 =*/10).fork()).ldelim();
        return writer;
    };

    /**
     * Encodes the specified List message, length delimited. Does not implicitly {@link List.verify|verify} messages.
     * @function encodeDelimited
     * @memberof List
     * @static
     * @param {IList} message List message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    List.encodeDelimited = function encodeDelimited(message, writer) {
        return this.encode(message, writer).ldelim();
    };

    /**
     * Decodes a List message from the specified reader or buffer.
     * @function decode
     * @memberof List
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @param {number} [length] Message length if known beforehand
     * @returns {List} List
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    List.decode = function decode(reader, length) {
        if (!(reader instanceof $Reader))
            reader = $Reader.create(reader);
        let end = length === undefined ? reader.len : reader.pos + length, message = new $root.List();
        while (reader.pos < end) {
            let tag = reader.uint32();
            switch (tag >>> 3) {
            case 1: {
                    if (!(message.entries && message.entries.length))
                        message.entries = [];
                    message.entries.push($root.List.Entry.decode(reader, reader.uint32()));
                    break;
                }
            default:
                reader.skipType(tag & 7);
                break;
            }
        }
        return message;
    };

    /**
     * Decodes a List message from the specified reader or buffer, length delimited.
     * @function decodeDelimited
     * @memberof List
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @returns {List} List
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    List.decodeDelimited = function decodeDelimited(reader) {
        if (!(reader instanceof $Reader))
            reader = new $Reader(reader);
        return this.decode(reader, reader.uint32());
    };

    /**
     * Verifies a List message.
     * @function verify
     * @memberof List
     * @static
     * @param {Object.<string,*>} message Plain object to verify
     * @returns {string|null} `null` if valid, otherwise the reason why it is not
     */
    List.verify = function verify(message) {
        if (typeof message !== "object" || message === null)
            return "object expected";
        if (message.entries != null && message.hasOwnProperty("entries")) {
            if (!Array.isArray(message.entries))
                return "entries: array expected";
            for (let i = 0; i < message.entries.length; ++i) {
                let error = $root.List.Entry.verify(message.entries[i]);
                if (error)
                    return "entries." + error;
            }
        }
        return null;
    };

    /**
     * Creates a List message from a plain object. Also converts values to their respective internal types.
     * @function fromObject
     * @memberof List
     * @static
     * @param {Object.<string,*>} object Plain object
     * @returns {List} List
     */
    List.fromObject = function fromObject(object) {
        if (object instanceof $root.List)
            return object;
        let message = new $root.List();
        if (object.entries) {
            if (!Array.isArray(object.entries))
                throw TypeError(".List.entries: array expected");
            message.entries = [];
            for (let i = 0; i < object.entries.length; ++i) {
                if (typeof object.entries[i] !== "object")
                    throw TypeError(".List.entries: object expected");
                message.entries[i] = $root.List.Entry.fromObject(object.entries[i]);
            }
        }
        return message;
    };

    /**
     * Creates a plain object from a List message. Also converts values to other types if specified.
     * @function toObject
     * @memberof List
     * @static
     * @param {List} message List
     * @param {$protobuf.IConversionOptions} [options] Conversion options
     * @returns {Object.<string,*>} Plain object
     */
    List.toObject = function toObject(message, options) {
        if (!options)
            options = {};
        let object = {};
        if (options.arrays || options.defaults)
            object.entries = [];
        if (message.entries && message.entries.length) {
            object.entries = [];
            for (let j = 0; j < message.entries.length; ++j)
                object.entries[j] = $root.List.Entry.toObject(message.entries[j], options);
        }
        return object;
    };

    /**
     * Converts this List to JSON.
     * @function toJSON
     * @memberof List
     * @instance
     * @returns {Object.<string,*>} JSON object
     */
    List.prototype.toJSON = function toJSON() {
        return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
    };

    /**
     * Gets the default type url for List
     * @function getTypeUrl
     * @memberof List
     * @static
     * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
     * @returns {string} The default type url
     */
    List.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
        if (typeUrlPrefix === undefined) {
            typeUrlPrefix = "type.googleapis.com";
        }
        return typeUrlPrefix + "/List";
    };

    List.Entry = (function() {

        /**
         * Properties of an Entry.
         * @memberof List
         * @interface IEntry
         * @property {number} index Entry index
         * @property {number} size Entry size
         * @property {string} name Entry name
         */

        /**
         * Constructs a new Entry.
         * @memberof List
         * @classdesc Represents an Entry.
         * @implements IEntry
         * @constructor
         * @param {List.IEntry=} [properties] Properties to set
         */
        function Entry(properties) {
            if (properties)
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * Entry index.
         * @member {number} index
         * @memberof List.Entry
         * @instance
         */
        Entry.prototype.index = 0;

        /**
         * Entry size.
         * @member {number} size
         * @memberof List.Entry
         * @instance
         */
        Entry.prototype.size = 0;

        /**
         * Entry name.
         * @member {string} name
         * @memberof List.Entry
         * @instance
         */
        Entry.prototype.name = "";

        /**
         * Creates a new Entry instance using the specified properties.
         * @function create
         * @memberof List.Entry
         * @static
         * @param {List.IEntry=} [properties] Properties to set
         * @returns {List.Entry} Entry instance
         */
        Entry.create = function create(properties) {
            return new Entry(properties);
        };

        /**
         * Encodes the specified Entry message. Does not implicitly {@link List.Entry.verify|verify} messages.
         * @function encode
         * @memberof List.Entry
         * @static
         * @param {List.IEntry} message Entry message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        Entry.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            writer.uint32(/* id 1, wireType 0 =*/8).uint32(message.index);
            writer.uint32(/* id 2, wireType 0 =*/16).uint32(message.size);
            writer.uint32(/* id 3, wireType 2 =*/26).string(message.name);
            return writer;
        };

        /**
         * Encodes the specified Entry message, length delimited. Does not implicitly {@link List.Entry.verify|verify} messages.
         * @function encodeDelimited
         * @memberof List.Entry
         * @static
         * @param {List.IEntry} message Entry message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        Entry.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes an Entry message from the specified reader or buffer.
         * @function decode
         * @memberof List.Entry
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {List.Entry} Entry
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        Entry.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            let end = length === undefined ? reader.len : reader.pos + length, message = new $root.List.Entry();
            while (reader.pos < end) {
                let tag = reader.uint32();
                switch (tag >>> 3) {
                case 1: {
                        message.index = reader.uint32();
                        break;
                    }
                case 2: {
                        message.size = reader.uint32();
                        break;
                    }
                case 3: {
                        message.name = reader.string();
                        break;
                    }
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            if (!message.hasOwnProperty("index"))
                throw $util.ProtocolError("missing required 'index'", { instance: message });
            if (!message.hasOwnProperty("size"))
                throw $util.ProtocolError("missing required 'size'", { instance: message });
            if (!message.hasOwnProperty("name"))
                throw $util.ProtocolError("missing required 'name'", { instance: message });
            return message;
        };

        /**
         * Decodes an Entry message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof List.Entry
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {List.Entry} Entry
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        Entry.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies an Entry message.
         * @function verify
         * @memberof List.Entry
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        Entry.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (!$util.isInteger(message.index))
                return "index: integer expected";
            if (!$util.isInteger(message.size))
                return "size: integer expected";
            if (!$util.isString(message.name))
                return "name: string expected";
            return null;
        };

        /**
         * Creates an Entry message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof List.Entry
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {List.Entry} Entry
         */
        Entry.fromObject = function fromObject(object) {
            if (object instanceof $root.List.Entry)
                return object;
            let message = new $root.List.Entry();
            if (object.index != null)
                message.index = object.index >>> 0;
            if (object.size != null)
                message.size = object.size >>> 0;
            if (object.name != null)
                message.name = String(object.name);
            return message;
        };

        /**
         * Creates a plain object from an Entry message. Also converts values to other types if specified.
         * @function toObject
         * @memberof List.Entry
         * @static
         * @param {List.Entry} message Entry
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        Entry.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            let object = {};
            if (options.defaults) {
                object.index = 0;
                object.size = 0;
                object.name = "";
            }
            if (message.index != null && message.hasOwnProperty("index"))
                object.index = message.index;
            if (message.size != null && message.hasOwnProperty("size"))
                object.size = message.size;
            if (message.name != null && message.hasOwnProperty("name"))
                object.name = message.name;
            return object;
        };

        /**
         * Converts this Entry to JSON.
         * @function toJSON
         * @memberof List.Entry
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        Entry.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        /**
         * Gets the default type url for Entry
         * @function getTypeUrl
         * @memberof List.Entry
         * @static
         * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns {string} The default type url
         */
        Entry.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
            if (typeUrlPrefix === undefined) {
                typeUrlPrefix = "type.googleapis.com";
            }
            return typeUrlPrefix + "/List.Entry";
        };

        return Entry;
    })();

    return List;
})();

export const Progress = $root.Progress = (() => {

    /**
     * Properties of a Progress.
     * @exports IProgress
     * @interface IProgress
     * @property {number} index Progress index
     * @property {number} progress Progress progress
     */

    /**
     * Constructs a new Progress.
     * @exports Progress
     * @classdesc Represents a Progress.
     * @implements IProgress
     * @constructor
     * @param {IProgress=} [properties] Properties to set
     */
    function Progress(properties) {
        if (properties)
            for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                if (properties[keys[i]] != null)
                    this[keys[i]] = properties[keys[i]];
    }

    /**
     * Progress index.
     * @member {number} index
     * @memberof Progress
     * @instance
     */
    Progress.prototype.index = 0;

    /**
     * Progress progress.
     * @member {number} progress
     * @memberof Progress
     * @instance
     */
    Progress.prototype.progress = 0;

    /**
     * Creates a new Progress instance using the specified properties.
     * @function create
     * @memberof Progress
     * @static
     * @param {IProgress=} [properties] Properties to set
     * @returns {Progress} Progress instance
     */
    Progress.create = function create(properties) {
        return new Progress(properties);
    };

    /**
     * Encodes the specified Progress message. Does not implicitly {@link Progress.verify|verify} messages.
     * @function encode
     * @memberof Progress
     * @static
     * @param {IProgress} message Progress message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    Progress.encode = function encode(message, writer) {
        if (!writer)
            writer = $Writer.create();
        writer.uint32(/* id 1, wireType 0 =*/8).uint32(message.index);
        writer.uint32(/* id 2, wireType 0 =*/16).uint32(message.progress);
        return writer;
    };

    /**
     * Encodes the specified Progress message, length delimited. Does not implicitly {@link Progress.verify|verify} messages.
     * @function encodeDelimited
     * @memberof Progress
     * @static
     * @param {IProgress} message Progress message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    Progress.encodeDelimited = function encodeDelimited(message, writer) {
        return this.encode(message, writer).ldelim();
    };

    /**
     * Decodes a Progress message from the specified reader or buffer.
     * @function decode
     * @memberof Progress
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @param {number} [length] Message length if known beforehand
     * @returns {Progress} Progress
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    Progress.decode = function decode(reader, length) {
        if (!(reader instanceof $Reader))
            reader = $Reader.create(reader);
        let end = length === undefined ? reader.len : reader.pos + length, message = new $root.Progress();
        while (reader.pos < end) {
            let tag = reader.uint32();
            switch (tag >>> 3) {
            case 1: {
                    message.index = reader.uint32();
                    break;
                }
            case 2: {
                    message.progress = reader.uint32();
                    break;
                }
            default:
                reader.skipType(tag & 7);
                break;
            }
        }
        if (!message.hasOwnProperty("index"))
            throw $util.ProtocolError("missing required 'index'", { instance: message });
        if (!message.hasOwnProperty("progress"))
            throw $util.ProtocolError("missing required 'progress'", { instance: message });
        return message;
    };

    /**
     * Decodes a Progress message from the specified reader or buffer, length delimited.
     * @function decodeDelimited
     * @memberof Progress
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @returns {Progress} Progress
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    Progress.decodeDelimited = function decodeDelimited(reader) {
        if (!(reader instanceof $Reader))
            reader = new $Reader(reader);
        return this.decode(reader, reader.uint32());
    };

    /**
     * Verifies a Progress message.
     * @function verify
     * @memberof Progress
     * @static
     * @param {Object.<string,*>} message Plain object to verify
     * @returns {string|null} `null` if valid, otherwise the reason why it is not
     */
    Progress.verify = function verify(message) {
        if (typeof message !== "object" || message === null)
            return "object expected";
        if (!$util.isInteger(message.index))
            return "index: integer expected";
        if (!$util.isInteger(message.progress))
            return "progress: integer expected";
        return null;
    };

    /**
     * Creates a Progress message from a plain object. Also converts values to their respective internal types.
     * @function fromObject
     * @memberof Progress
     * @static
     * @param {Object.<string,*>} object Plain object
     * @returns {Progress} Progress
     */
    Progress.fromObject = function fromObject(object) {
        if (object instanceof $root.Progress)
            return object;
        let message = new $root.Progress();
        if (object.index != null)
            message.index = object.index >>> 0;
        if (object.progress != null)
            message.progress = object.progress >>> 0;
        return message;
    };

    /**
     * Creates a plain object from a Progress message. Also converts values to other types if specified.
     * @function toObject
     * @memberof Progress
     * @static
     * @param {Progress} message Progress
     * @param {$protobuf.IConversionOptions} [options] Conversion options
     * @returns {Object.<string,*>} Plain object
     */
    Progress.toObject = function toObject(message, options) {
        if (!options)
            options = {};
        let object = {};
        if (options.defaults) {
            object.index = 0;
            object.progress = 0;
        }
        if (message.index != null && message.hasOwnProperty("index"))
            object.index = message.index;
        if (message.progress != null && message.hasOwnProperty("progress"))
            object.progress = message.progress;
        return object;
    };

    /**
     * Converts this Progress to JSON.
     * @function toJSON
     * @memberof Progress
     * @instance
     * @returns {Object.<string,*>} JSON object
     */
    Progress.prototype.toJSON = function toJSON() {
        return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
    };

    /**
     * Gets the default type url for Progress
     * @function getTypeUrl
     * @memberof Progress
     * @static
     * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
     * @returns {string} The default type url
     */
    Progress.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
        if (typeUrlPrefix === undefined) {
            typeUrlPrefix = "type.googleapis.com";
        }
        return typeUrlPrefix + "/Progress";
    };

    return Progress;
})();

export const Chunk = $root.Chunk = (() => {

    /**
     * Properties of a Chunk.
     * @exports IChunk
     * @interface IChunk
     * @property {Uint8Array} chunk Chunk chunk
     */

    /**
     * Constructs a new Chunk.
     * @exports Chunk
     * @classdesc Represents a Chunk.
     * @implements IChunk
     * @constructor
     * @param {IChunk=} [properties] Properties to set
     */
    function Chunk(properties) {
        if (properties)
            for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                if (properties[keys[i]] != null)
                    this[keys[i]] = properties[keys[i]];
    }

    /**
     * Chunk chunk.
     * @member {Uint8Array} chunk
     * @memberof Chunk
     * @instance
     */
    Chunk.prototype.chunk = $util.newBuffer([]);

    /**
     * Creates a new Chunk instance using the specified properties.
     * @function create
     * @memberof Chunk
     * @static
     * @param {IChunk=} [properties] Properties to set
     * @returns {Chunk} Chunk instance
     */
    Chunk.create = function create(properties) {
        return new Chunk(properties);
    };

    /**
     * Encodes the specified Chunk message. Does not implicitly {@link Chunk.verify|verify} messages.
     * @function encode
     * @memberof Chunk
     * @static
     * @param {IChunk} message Chunk message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    Chunk.encode = function encode(message, writer) {
        if (!writer)
            writer = $Writer.create();
        writer.uint32(/* id 1, wireType 2 =*/10).bytes(message.chunk);
        return writer;
    };

    /**
     * Encodes the specified Chunk message, length delimited. Does not implicitly {@link Chunk.verify|verify} messages.
     * @function encodeDelimited
     * @memberof Chunk
     * @static
     * @param {IChunk} message Chunk message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    Chunk.encodeDelimited = function encodeDelimited(message, writer) {
        return this.encode(message, writer).ldelim();
    };

    /**
     * Decodes a Chunk message from the specified reader or buffer.
     * @function decode
     * @memberof Chunk
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @param {number} [length] Message length if known beforehand
     * @returns {Chunk} Chunk
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    Chunk.decode = function decode(reader, length) {
        if (!(reader instanceof $Reader))
            reader = $Reader.create(reader);
        let end = length === undefined ? reader.len : reader.pos + length, message = new $root.Chunk();
        while (reader.pos < end) {
            let tag = reader.uint32();
            switch (tag >>> 3) {
            case 1: {
                    message.chunk = reader.bytes();
                    break;
                }
            default:
                reader.skipType(tag & 7);
                break;
            }
        }
        if (!message.hasOwnProperty("chunk"))
            throw $util.ProtocolError("missing required 'chunk'", { instance: message });
        return message;
    };

    /**
     * Decodes a Chunk message from the specified reader or buffer, length delimited.
     * @function decodeDelimited
     * @memberof Chunk
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @returns {Chunk} Chunk
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    Chunk.decodeDelimited = function decodeDelimited(reader) {
        if (!(reader instanceof $Reader))
            reader = new $Reader(reader);
        return this.decode(reader, reader.uint32());
    };

    /**
     * Verifies a Chunk message.
     * @function verify
     * @memberof Chunk
     * @static
     * @param {Object.<string,*>} message Plain object to verify
     * @returns {string|null} `null` if valid, otherwise the reason why it is not
     */
    Chunk.verify = function verify(message) {
        if (typeof message !== "object" || message === null)
            return "object expected";
        if (!(message.chunk && typeof message.chunk.length === "number" || $util.isString(message.chunk)))
            return "chunk: buffer expected";
        return null;
    };

    /**
     * Creates a Chunk message from a plain object. Also converts values to their respective internal types.
     * @function fromObject
     * @memberof Chunk
     * @static
     * @param {Object.<string,*>} object Plain object
     * @returns {Chunk} Chunk
     */
    Chunk.fromObject = function fromObject(object) {
        if (object instanceof $root.Chunk)
            return object;
        let message = new $root.Chunk();
        if (object.chunk != null)
            if (typeof object.chunk === "string")
                $util.base64.decode(object.chunk, message.chunk = $util.newBuffer($util.base64.length(object.chunk)), 0);
            else if (object.chunk.length >= 0)
                message.chunk = object.chunk;
        return message;
    };

    /**
     * Creates a plain object from a Chunk message. Also converts values to other types if specified.
     * @function toObject
     * @memberof Chunk
     * @static
     * @param {Chunk} message Chunk
     * @param {$protobuf.IConversionOptions} [options] Conversion options
     * @returns {Object.<string,*>} Plain object
     */
    Chunk.toObject = function toObject(message, options) {
        if (!options)
            options = {};
        let object = {};
        if (options.defaults)
            if (options.bytes === String)
                object.chunk = "";
            else {
                object.chunk = [];
                if (options.bytes !== Array)
                    object.chunk = $util.newBuffer(object.chunk);
            }
        if (message.chunk != null && message.hasOwnProperty("chunk"))
            object.chunk = options.bytes === String ? $util.base64.encode(message.chunk, 0, message.chunk.length) : options.bytes === Array ? Array.prototype.slice.call(message.chunk) : message.chunk;
        return object;
    };

    /**
     * Converts this Chunk to JSON.
     * @function toJSON
     * @memberof Chunk
     * @instance
     * @returns {Object.<string,*>} JSON object
     */
    Chunk.prototype.toJSON = function toJSON() {
        return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
    };

    /**
     * Gets the default type url for Chunk
     * @function getTypeUrl
     * @memberof Chunk
     * @static
     * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
     * @returns {string} The default type url
     */
    Chunk.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
        if (typeUrlPrefix === undefined) {
            typeUrlPrefix = "type.googleapis.com";
        }
        return typeUrlPrefix + "/Chunk";
    };

    return Chunk;
})();

export const Packet = $root.Packet = (() => {

    /**
     * Properties of a Packet.
     * @exports IPacket
     * @interface IPacket
     * @property {IHandshake|null} [handshake] Packet handshake
     * @property {IHandshakeResponse|null} [handshakeResponse] Packet handshakeResponse
     * @property {IList|null} [list] Packet list
     * @property {IProgress|null} [progress] Packet progress
     * @property {IChunk|null} [chunk] Packet chunk
     */

    /**
     * Constructs a new Packet.
     * @exports Packet
     * @classdesc Represents a Packet.
     * @implements IPacket
     * @constructor
     * @param {IPacket=} [properties] Properties to set
     */
    function Packet(properties) {
        if (properties)
            for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                if (properties[keys[i]] != null)
                    this[keys[i]] = properties[keys[i]];
    }

    /**
     * Packet handshake.
     * @member {IHandshake|null|undefined} handshake
     * @memberof Packet
     * @instance
     */
    Packet.prototype.handshake = null;

    /**
     * Packet handshakeResponse.
     * @member {IHandshakeResponse|null|undefined} handshakeResponse
     * @memberof Packet
     * @instance
     */
    Packet.prototype.handshakeResponse = null;

    /**
     * Packet list.
     * @member {IList|null|undefined} list
     * @memberof Packet
     * @instance
     */
    Packet.prototype.list = null;

    /**
     * Packet progress.
     * @member {IProgress|null|undefined} progress
     * @memberof Packet
     * @instance
     */
    Packet.prototype.progress = null;

    /**
     * Packet chunk.
     * @member {IChunk|null|undefined} chunk
     * @memberof Packet
     * @instance
     */
    Packet.prototype.chunk = null;

    // OneOf field names bound to virtual getters and setters
    let $oneOfFields;

    /**
     * Packet value.
     * @member {"handshake"|"handshakeResponse"|"list"|"progress"|"chunk"|undefined} value
     * @memberof Packet
     * @instance
     */
    Object.defineProperty(Packet.prototype, "value", {
        get: $util.oneOfGetter($oneOfFields = ["handshake", "handshakeResponse", "list", "progress", "chunk"]),
        set: $util.oneOfSetter($oneOfFields)
    });

    /**
     * Creates a new Packet instance using the specified properties.
     * @function create
     * @memberof Packet
     * @static
     * @param {IPacket=} [properties] Properties to set
     * @returns {Packet} Packet instance
     */
    Packet.create = function create(properties) {
        return new Packet(properties);
    };

    /**
     * Encodes the specified Packet message. Does not implicitly {@link Packet.verify|verify} messages.
     * @function encode
     * @memberof Packet
     * @static
     * @param {IPacket} message Packet message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    Packet.encode = function encode(message, writer) {
        if (!writer)
            writer = $Writer.create();
        if (message.handshake != null && Object.hasOwnProperty.call(message, "handshake"))
            $root.Handshake.encode(message.handshake, writer.uint32(/* id 1, wireType 2 =*/10).fork()).ldelim();
        if (message.handshakeResponse != null && Object.hasOwnProperty.call(message, "handshakeResponse"))
            $root.HandshakeResponse.encode(message.handshakeResponse, writer.uint32(/* id 2, wireType 2 =*/18).fork()).ldelim();
        if (message.list != null && Object.hasOwnProperty.call(message, "list"))
            $root.List.encode(message.list, writer.uint32(/* id 3, wireType 2 =*/26).fork()).ldelim();
        if (message.progress != null && Object.hasOwnProperty.call(message, "progress"))
            $root.Progress.encode(message.progress, writer.uint32(/* id 4, wireType 2 =*/34).fork()).ldelim();
        if (message.chunk != null && Object.hasOwnProperty.call(message, "chunk"))
            $root.Chunk.encode(message.chunk, writer.uint32(/* id 5, wireType 2 =*/42).fork()).ldelim();
        return writer;
    };

    /**
     * Encodes the specified Packet message, length delimited. Does not implicitly {@link Packet.verify|verify} messages.
     * @function encodeDelimited
     * @memberof Packet
     * @static
     * @param {IPacket} message Packet message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    Packet.encodeDelimited = function encodeDelimited(message, writer) {
        return this.encode(message, writer).ldelim();
    };

    /**
     * Decodes a Packet message from the specified reader or buffer.
     * @function decode
     * @memberof Packet
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @param {number} [length] Message length if known beforehand
     * @returns {Packet} Packet
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    Packet.decode = function decode(reader, length) {
        if (!(reader instanceof $Reader))
            reader = $Reader.create(reader);
        let end = length === undefined ? reader.len : reader.pos + length, message = new $root.Packet();
        while (reader.pos < end) {
            let tag = reader.uint32();
            switch (tag >>> 3) {
            case 1: {
                    message.handshake = $root.Handshake.decode(reader, reader.uint32());
                    break;
                }
            case 2: {
                    message.handshakeResponse = $root.HandshakeResponse.decode(reader, reader.uint32());
                    break;
                }
            case 3: {
                    message.list = $root.List.decode(reader, reader.uint32());
                    break;
                }
            case 4: {
                    message.progress = $root.Progress.decode(reader, reader.uint32());
                    break;
                }
            case 5: {
                    message.chunk = $root.Chunk.decode(reader, reader.uint32());
                    break;
                }
            default:
                reader.skipType(tag & 7);
                break;
            }
        }
        return message;
    };

    /**
     * Decodes a Packet message from the specified reader or buffer, length delimited.
     * @function decodeDelimited
     * @memberof Packet
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @returns {Packet} Packet
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    Packet.decodeDelimited = function decodeDelimited(reader) {
        if (!(reader instanceof $Reader))
            reader = new $Reader(reader);
        return this.decode(reader, reader.uint32());
    };

    /**
     * Verifies a Packet message.
     * @function verify
     * @memberof Packet
     * @static
     * @param {Object.<string,*>} message Plain object to verify
     * @returns {string|null} `null` if valid, otherwise the reason why it is not
     */
    Packet.verify = function verify(message) {
        if (typeof message !== "object" || message === null)
            return "object expected";
        let properties = {};
        if (message.handshake != null && message.hasOwnProperty("handshake")) {
            properties.value = 1;
            {
                let error = $root.Handshake.verify(message.handshake);
                if (error)
                    return "handshake." + error;
            }
        }
        if (message.handshakeResponse != null && message.hasOwnProperty("handshakeResponse")) {
            if (properties.value === 1)
                return "value: multiple values";
            properties.value = 1;
            {
                let error = $root.HandshakeResponse.verify(message.handshakeResponse);
                if (error)
                    return "handshakeResponse." + error;
            }
        }
        if (message.list != null && message.hasOwnProperty("list")) {
            if (properties.value === 1)
                return "value: multiple values";
            properties.value = 1;
            {
                let error = $root.List.verify(message.list);
                if (error)
                    return "list." + error;
            }
        }
        if (message.progress != null && message.hasOwnProperty("progress")) {
            if (properties.value === 1)
                return "value: multiple values";
            properties.value = 1;
            {
                let error = $root.Progress.verify(message.progress);
                if (error)
                    return "progress." + error;
            }
        }
        if (message.chunk != null && message.hasOwnProperty("chunk")) {
            if (properties.value === 1)
                return "value: multiple values";
            properties.value = 1;
            {
                let error = $root.Chunk.verify(message.chunk);
                if (error)
                    return "chunk." + error;
            }
        }
        return null;
    };

    /**
     * Creates a Packet message from a plain object. Also converts values to their respective internal types.
     * @function fromObject
     * @memberof Packet
     * @static
     * @param {Object.<string,*>} object Plain object
     * @returns {Packet} Packet
     */
    Packet.fromObject = function fromObject(object) {
        if (object instanceof $root.Packet)
            return object;
        let message = new $root.Packet();
        if (object.handshake != null) {
            if (typeof object.handshake !== "object")
                throw TypeError(".Packet.handshake: object expected");
            message.handshake = $root.Handshake.fromObject(object.handshake);
        }
        if (object.handshakeResponse != null) {
            if (typeof object.handshakeResponse !== "object")
                throw TypeError(".Packet.handshakeResponse: object expected");
            message.handshakeResponse = $root.HandshakeResponse.fromObject(object.handshakeResponse);
        }
        if (object.list != null) {
            if (typeof object.list !== "object")
                throw TypeError(".Packet.list: object expected");
            message.list = $root.List.fromObject(object.list);
        }
        if (object.progress != null) {
            if (typeof object.progress !== "object")
                throw TypeError(".Packet.progress: object expected");
            message.progress = $root.Progress.fromObject(object.progress);
        }
        if (object.chunk != null) {
            if (typeof object.chunk !== "object")
                throw TypeError(".Packet.chunk: object expected");
            message.chunk = $root.Chunk.fromObject(object.chunk);
        }
        return message;
    };

    /**
     * Creates a plain object from a Packet message. Also converts values to other types if specified.
     * @function toObject
     * @memberof Packet
     * @static
     * @param {Packet} message Packet
     * @param {$protobuf.IConversionOptions} [options] Conversion options
     * @returns {Object.<string,*>} Plain object
     */
    Packet.toObject = function toObject(message, options) {
        if (!options)
            options = {};
        let object = {};
        if (message.handshake != null && message.hasOwnProperty("handshake")) {
            object.handshake = $root.Handshake.toObject(message.handshake, options);
            if (options.oneofs)
                object.value = "handshake";
        }
        if (message.handshakeResponse != null && message.hasOwnProperty("handshakeResponse")) {
            object.handshakeResponse = $root.HandshakeResponse.toObject(message.handshakeResponse, options);
            if (options.oneofs)
                object.value = "handshakeResponse";
        }
        if (message.list != null && message.hasOwnProperty("list")) {
            object.list = $root.List.toObject(message.list, options);
            if (options.oneofs)
                object.value = "list";
        }
        if (message.progress != null && message.hasOwnProperty("progress")) {
            object.progress = $root.Progress.toObject(message.progress, options);
            if (options.oneofs)
                object.value = "progress";
        }
        if (message.chunk != null && message.hasOwnProperty("chunk")) {
            object.chunk = $root.Chunk.toObject(message.chunk, options);
            if (options.oneofs)
                object.value = "chunk";
        }
        return object;
    };

    /**
     * Converts this Packet to JSON.
     * @function toJSON
     * @memberof Packet
     * @instance
     * @returns {Object.<string,*>} JSON object
     */
    Packet.prototype.toJSON = function toJSON() {
        return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
    };

    /**
     * Gets the default type url for Packet
     * @function getTypeUrl
     * @memberof Packet
     * @static
     * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
     * @returns {string} The default type url
     */
    Packet.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
        if (typeUrlPrefix === undefined) {
            typeUrlPrefix = "type.googleapis.com";
        }
        return typeUrlPrefix + "/Packet";
    };

    return Packet;
})();

export { $root as default };
