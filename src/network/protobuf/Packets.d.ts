import * as $protobuf from "protobufjs";
import Long = require("long");
/** Properties of a Handshake. */
export interface IHandshake {

    /** Handshake publicKey */
    publicKey: Uint8Array;

    /** Handshake signature */
    signature: Uint8Array;
}

/** Represents a Handshake. */
export class Handshake implements IHandshake {

    /**
     * Constructs a new Handshake.
     * @param [properties] Properties to set
     */
    constructor(properties?: IHandshake);

    /** Handshake publicKey. */
    public publicKey: Uint8Array;

    /** Handshake signature. */
    public signature: Uint8Array;

    /**
     * Creates a new Handshake instance using the specified properties.
     * @param [properties] Properties to set
     * @returns Handshake instance
     */
    public static create(properties?: IHandshake): Handshake;

    /**
     * Encodes the specified Handshake message. Does not implicitly {@link Handshake.verify|verify} messages.
     * @param message Handshake message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(message: IHandshake, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Encodes the specified Handshake message, length delimited. Does not implicitly {@link Handshake.verify|verify} messages.
     * @param message Handshake message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encodeDelimited(message: IHandshake, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Decodes a Handshake message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns Handshake
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): Handshake;

    /**
     * Decodes a Handshake message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns Handshake
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): Handshake;

    /**
     * Verifies a Handshake message.
     * @param message Plain object to verify
     * @returns `null` if valid, otherwise the reason why it is not
     */
    public static verify(message: { [k: string]: any }): (string|null);

    /**
     * Creates a Handshake message from a plain object. Also converts values to their respective internal types.
     * @param object Plain object
     * @returns Handshake
     */
    public static fromObject(object: { [k: string]: any }): Handshake;

    /**
     * Creates a plain object from a Handshake message. Also converts values to other types if specified.
     * @param message Handshake
     * @param [options] Conversion options
     * @returns Plain object
     */
    public static toObject(message: Handshake, options?: $protobuf.IConversionOptions): { [k: string]: any };

    /**
     * Converts this Handshake to JSON.
     * @returns JSON object
     */
    public toJSON(): { [k: string]: any };

    /**
     * Gets the default type url for Handshake
     * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
     * @returns The default type url
     */
    public static getTypeUrl(typeUrlPrefix?: string): string;
}

/** Properties of a HandshakeResponse. */
export interface IHandshakeResponse {

    /** HandshakeResponse publicKey */
    publicKey: Uint8Array;

    /** HandshakeResponse signature */
    signature: Uint8Array;
}

/** Represents a HandshakeResponse. */
export class HandshakeResponse implements IHandshakeResponse {

    /**
     * Constructs a new HandshakeResponse.
     * @param [properties] Properties to set
     */
    constructor(properties?: IHandshakeResponse);

    /** HandshakeResponse publicKey. */
    public publicKey: Uint8Array;

    /** HandshakeResponse signature. */
    public signature: Uint8Array;

    /**
     * Creates a new HandshakeResponse instance using the specified properties.
     * @param [properties] Properties to set
     * @returns HandshakeResponse instance
     */
    public static create(properties?: IHandshakeResponse): HandshakeResponse;

    /**
     * Encodes the specified HandshakeResponse message. Does not implicitly {@link HandshakeResponse.verify|verify} messages.
     * @param message HandshakeResponse message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(message: IHandshakeResponse, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Encodes the specified HandshakeResponse message, length delimited. Does not implicitly {@link HandshakeResponse.verify|verify} messages.
     * @param message HandshakeResponse message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encodeDelimited(message: IHandshakeResponse, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Decodes a HandshakeResponse message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns HandshakeResponse
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): HandshakeResponse;

    /**
     * Decodes a HandshakeResponse message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns HandshakeResponse
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): HandshakeResponse;

    /**
     * Verifies a HandshakeResponse message.
     * @param message Plain object to verify
     * @returns `null` if valid, otherwise the reason why it is not
     */
    public static verify(message: { [k: string]: any }): (string|null);

    /**
     * Creates a HandshakeResponse message from a plain object. Also converts values to their respective internal types.
     * @param object Plain object
     * @returns HandshakeResponse
     */
    public static fromObject(object: { [k: string]: any }): HandshakeResponse;

    /**
     * Creates a plain object from a HandshakeResponse message. Also converts values to other types if specified.
     * @param message HandshakeResponse
     * @param [options] Conversion options
     * @returns Plain object
     */
    public static toObject(message: HandshakeResponse, options?: $protobuf.IConversionOptions): { [k: string]: any };

    /**
     * Converts this HandshakeResponse to JSON.
     * @returns JSON object
     */
    public toJSON(): { [k: string]: any };

    /**
     * Gets the default type url for HandshakeResponse
     * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
     * @returns The default type url
     */
    public static getTypeUrl(typeUrlPrefix?: string): string;
}

/** Properties of a List. */
export interface IList {

    /** List entries */
    entries?: (List.IEntry[]|null);
}

/** Represents a List. */
export class List implements IList {

    /**
     * Constructs a new List.
     * @param [properties] Properties to set
     */
    constructor(properties?: IList);

    /** List entries. */
    public entries: List.IEntry[];

    /**
     * Creates a new List instance using the specified properties.
     * @param [properties] Properties to set
     * @returns List instance
     */
    public static create(properties?: IList): List;

    /**
     * Encodes the specified List message. Does not implicitly {@link List.verify|verify} messages.
     * @param message List message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(message: IList, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Encodes the specified List message, length delimited. Does not implicitly {@link List.verify|verify} messages.
     * @param message List message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encodeDelimited(message: IList, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Decodes a List message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns List
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): List;

    /**
     * Decodes a List message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns List
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): List;

    /**
     * Verifies a List message.
     * @param message Plain object to verify
     * @returns `null` if valid, otherwise the reason why it is not
     */
    public static verify(message: { [k: string]: any }): (string|null);

    /**
     * Creates a List message from a plain object. Also converts values to their respective internal types.
     * @param object Plain object
     * @returns List
     */
    public static fromObject(object: { [k: string]: any }): List;

    /**
     * Creates a plain object from a List message. Also converts values to other types if specified.
     * @param message List
     * @param [options] Conversion options
     * @returns Plain object
     */
    public static toObject(message: List, options?: $protobuf.IConversionOptions): { [k: string]: any };

    /**
     * Converts this List to JSON.
     * @returns JSON object
     */
    public toJSON(): { [k: string]: any };

    /**
     * Gets the default type url for List
     * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
     * @returns The default type url
     */
    public static getTypeUrl(typeUrlPrefix?: string): string;
}

export namespace List {

    /** Properties of an Entry. */
    interface IEntry {

        /** Entry index */
        index: number;

        /** Entry size */
        size: number;

        /** Entry name */
        name: string;
    }

    /** Represents an Entry. */
    class Entry implements IEntry {

        /**
         * Constructs a new Entry.
         * @param [properties] Properties to set
         */
        constructor(properties?: List.IEntry);

        /** Entry index. */
        public index: number;

        /** Entry size. */
        public size: number;

        /** Entry name. */
        public name: string;

        /**
         * Creates a new Entry instance using the specified properties.
         * @param [properties] Properties to set
         * @returns Entry instance
         */
        public static create(properties?: List.IEntry): List.Entry;

        /**
         * Encodes the specified Entry message. Does not implicitly {@link List.Entry.verify|verify} messages.
         * @param message Entry message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: List.IEntry, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified Entry message, length delimited. Does not implicitly {@link List.Entry.verify|verify} messages.
         * @param message Entry message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: List.IEntry, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes an Entry message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns Entry
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): List.Entry;

        /**
         * Decodes an Entry message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns Entry
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): List.Entry;

        /**
         * Verifies an Entry message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates an Entry message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns Entry
         */
        public static fromObject(object: { [k: string]: any }): List.Entry;

        /**
         * Creates a plain object from an Entry message. Also converts values to other types if specified.
         * @param message Entry
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: List.Entry, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this Entry to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };

        /**
         * Gets the default type url for Entry
         * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns The default type url
         */
        public static getTypeUrl(typeUrlPrefix?: string): string;
    }
}

/** Properties of a Progress. */
export interface IProgress {

    /** Progress index */
    index: number;

    /** Progress progress */
    progress: number;
}

/** Represents a Progress. */
export class Progress implements IProgress {

    /**
     * Constructs a new Progress.
     * @param [properties] Properties to set
     */
    constructor(properties?: IProgress);

    /** Progress index. */
    public index: number;

    /** Progress progress. */
    public progress: number;

    /**
     * Creates a new Progress instance using the specified properties.
     * @param [properties] Properties to set
     * @returns Progress instance
     */
    public static create(properties?: IProgress): Progress;

    /**
     * Encodes the specified Progress message. Does not implicitly {@link Progress.verify|verify} messages.
     * @param message Progress message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(message: IProgress, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Encodes the specified Progress message, length delimited. Does not implicitly {@link Progress.verify|verify} messages.
     * @param message Progress message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encodeDelimited(message: IProgress, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Decodes a Progress message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns Progress
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): Progress;

    /**
     * Decodes a Progress message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns Progress
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): Progress;

    /**
     * Verifies a Progress message.
     * @param message Plain object to verify
     * @returns `null` if valid, otherwise the reason why it is not
     */
    public static verify(message: { [k: string]: any }): (string|null);

    /**
     * Creates a Progress message from a plain object. Also converts values to their respective internal types.
     * @param object Plain object
     * @returns Progress
     */
    public static fromObject(object: { [k: string]: any }): Progress;

    /**
     * Creates a plain object from a Progress message. Also converts values to other types if specified.
     * @param message Progress
     * @param [options] Conversion options
     * @returns Plain object
     */
    public static toObject(message: Progress, options?: $protobuf.IConversionOptions): { [k: string]: any };

    /**
     * Converts this Progress to JSON.
     * @returns JSON object
     */
    public toJSON(): { [k: string]: any };

    /**
     * Gets the default type url for Progress
     * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
     * @returns The default type url
     */
    public static getTypeUrl(typeUrlPrefix?: string): string;
}

/** Properties of a Chunk. */
export interface IChunk {

    /** Chunk chunk */
    chunk: Uint8Array;
}

/** Represents a Chunk. */
export class Chunk implements IChunk {

    /**
     * Constructs a new Chunk.
     * @param [properties] Properties to set
     */
    constructor(properties?: IChunk);

    /** Chunk chunk. */
    public chunk: Uint8Array;

    /**
     * Creates a new Chunk instance using the specified properties.
     * @param [properties] Properties to set
     * @returns Chunk instance
     */
    public static create(properties?: IChunk): Chunk;

    /**
     * Encodes the specified Chunk message. Does not implicitly {@link Chunk.verify|verify} messages.
     * @param message Chunk message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(message: IChunk, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Encodes the specified Chunk message, length delimited. Does not implicitly {@link Chunk.verify|verify} messages.
     * @param message Chunk message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encodeDelimited(message: IChunk, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Decodes a Chunk message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns Chunk
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): Chunk;

    /**
     * Decodes a Chunk message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns Chunk
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): Chunk;

    /**
     * Verifies a Chunk message.
     * @param message Plain object to verify
     * @returns `null` if valid, otherwise the reason why it is not
     */
    public static verify(message: { [k: string]: any }): (string|null);

    /**
     * Creates a Chunk message from a plain object. Also converts values to their respective internal types.
     * @param object Plain object
     * @returns Chunk
     */
    public static fromObject(object: { [k: string]: any }): Chunk;

    /**
     * Creates a plain object from a Chunk message. Also converts values to other types if specified.
     * @param message Chunk
     * @param [options] Conversion options
     * @returns Plain object
     */
    public static toObject(message: Chunk, options?: $protobuf.IConversionOptions): { [k: string]: any };

    /**
     * Converts this Chunk to JSON.
     * @returns JSON object
     */
    public toJSON(): { [k: string]: any };

    /**
     * Gets the default type url for Chunk
     * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
     * @returns The default type url
     */
    public static getTypeUrl(typeUrlPrefix?: string): string;
}

/** Properties of a Packet. */
export interface IPacket {

    /** Packet handshake */
    handshake?: (IHandshake|null);

    /** Packet handshakeResponse */
    handshakeResponse?: (IHandshakeResponse|null);

    /** Packet list */
    list?: (IList|null);

    /** Packet progress */
    progress?: (IProgress|null);

    /** Packet chunk */
    chunk?: (IChunk|null);
}

/** Represents a Packet. */
export class Packet implements IPacket {

    /**
     * Constructs a new Packet.
     * @param [properties] Properties to set
     */
    constructor(properties?: IPacket);

    /** Packet handshake. */
    public handshake?: (IHandshake|null);

    /** Packet handshakeResponse. */
    public handshakeResponse?: (IHandshakeResponse|null);

    /** Packet list. */
    public list?: (IList|null);

    /** Packet progress. */
    public progress?: (IProgress|null);

    /** Packet chunk. */
    public chunk?: (IChunk|null);

    /** Packet value. */
    public value?: ("handshake"|"handshakeResponse"|"list"|"progress"|"chunk");

    /**
     * Creates a new Packet instance using the specified properties.
     * @param [properties] Properties to set
     * @returns Packet instance
     */
    public static create(properties?: IPacket): Packet;

    /**
     * Encodes the specified Packet message. Does not implicitly {@link Packet.verify|verify} messages.
     * @param message Packet message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(message: IPacket, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Encodes the specified Packet message, length delimited. Does not implicitly {@link Packet.verify|verify} messages.
     * @param message Packet message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encodeDelimited(message: IPacket, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Decodes a Packet message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns Packet
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): Packet;

    /**
     * Decodes a Packet message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns Packet
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): Packet;

    /**
     * Verifies a Packet message.
     * @param message Plain object to verify
     * @returns `null` if valid, otherwise the reason why it is not
     */
    public static verify(message: { [k: string]: any }): (string|null);

    /**
     * Creates a Packet message from a plain object. Also converts values to their respective internal types.
     * @param object Plain object
     * @returns Packet
     */
    public static fromObject(object: { [k: string]: any }): Packet;

    /**
     * Creates a plain object from a Packet message. Also converts values to other types if specified.
     * @param message Packet
     * @param [options] Conversion options
     * @returns Plain object
     */
    public static toObject(message: Packet, options?: $protobuf.IConversionOptions): { [k: string]: any };

    /**
     * Converts this Packet to JSON.
     * @returns JSON object
     */
    public toJSON(): { [k: string]: any };

    /**
     * Gets the default type url for Packet
     * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
     * @returns The default type url
     */
    public static getTypeUrl(typeUrlPrefix?: string): string;
}
