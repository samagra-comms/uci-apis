
/**
 * Client
**/

import * as runtime from './runtime/index';
declare const prisma: unique symbol
export type PrismaPromise<A> = Promise<A> & {[prisma]: true}
type UnwrapPromise<P extends any> = P extends Promise<infer R> ? R : P
type UnwrapTuple<Tuple extends readonly unknown[]> = {
  [K in keyof Tuple]: K extends `${number}` ? Tuple[K] extends PrismaPromise<infer X> ? X : UnwrapPromise<Tuple[K]> : UnwrapPromise<Tuple[K]>
};


/**
 * Model Adapter
 * 
 */
export type Adapter = {
  id: string
  createdAt: Date
  updatedAt: Date
  channel: string
  provider: string
  config: Prisma.JsonValue
  name: string
}

/**
 * Model Board
 * 
 */
export type Board = {
  id: number
  name: string
}

/**
 * Model Service
 * 
 */
export type Service = {
  id: string
  createdAt: Date
  updatedAt: Date
  type: string
  config: Prisma.JsonValue | null
  name: string | null
}

/**
 * Model Transformer
 * 
 */
export type Transformer = {
  id: string
  createdAt: Date
  updatedAt: Date
  name: string
  tags: string[]
  config: Prisma.JsonValue
  serviceId: string
}

/**
 * Model TransformerConfig
 * 
 */
export type TransformerConfig = {
  id: string
  createdAt: Date
  updatedAt: Date
  meta: Prisma.JsonValue
  transformerId: string
  conversationLogicId: string | null
}

/**
 * Model Bot
 * 
 */
export type Bot = {
  id: string
  createdAt: Date
  updatedAt: Date
  name: string
  startingMessage: string
  ownerID: string | null
  ownerOrgID: string | null
  purpose: string | null
  description: string | null
  startDate: Date | null
  endDate: Date | null
}

/**
 * Model UserSegment
 * 
 */
export type UserSegment = {
  id: string
  createdAt: Date
  updatedAt: Date
  name: string
  description: string | null
  count: number
  category: string | null
  allServiceID: string | null
  byPhoneServiceID: string | null
  byIDServiceID: string | null
  botId: string | null
}

/**
 * Model ConversationLogic
 * 
 */
export type ConversationLogic = {
  id: string
  name: string
  createdAt: Date
  updatedAt: Date
  description: string | null
  adapterId: string
}


/**
 * ##  Prisma Client ʲˢ
 * 
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient()
 * // Fetch zero or more Adapters
 * const adapters = await prisma.adapter.findMany()
 * ```
 *
 * 
 * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
 */
export class PrismaClient<
  T extends Prisma.PrismaClientOptions = Prisma.PrismaClientOptions,
  U = 'log' extends keyof T ? T['log'] extends Array<Prisma.LogLevel | Prisma.LogDefinition> ? Prisma.GetEvents<T['log']> : never : never,
  GlobalReject = 'rejectOnNotFound' extends keyof T
    ? T['rejectOnNotFound']
    : false
      > {
      /**
       * @private
       */
      private fetcher;
      /**
       * @private
       */
      private readonly dmmf;
      /**
       * @private
       */
      private connectionPromise?;
      /**
       * @private
       */
      private disconnectionPromise?;
      /**
       * @private
       */
      private readonly engineConfig;
      /**
       * @private
       */
      private readonly measurePerformance;

    /**
   * ##  Prisma Client ʲˢ
   * 
   * Type-safe database client for TypeScript & Node.js
   * @example
   * ```
   * const prisma = new PrismaClient()
   * // Fetch zero or more Adapters
   * const adapters = await prisma.adapter.findMany()
   * ```
   *
   * 
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
   */

  constructor(optionsArg ?: Prisma.Subset<T, Prisma.PrismaClientOptions>);
  $on<V extends (U | 'beforeExit')>(eventType: V, callback: (event: V extends 'query' ? Prisma.QueryEvent : V extends 'beforeExit' ? () => Promise<void> : Prisma.LogEvent) => void): void;

  /**
   * Connect with the database
   */
  $connect(): Promise<void>;

  /**
   * Disconnect from the database
   */
  $disconnect(): Promise<void>;

  /**
   * Add a middleware
   */
  $use(cb: Prisma.Middleware): void

/**
   * Executes a prepared raw query and returns the number of affected rows.
   * @example
   * ```
   * const result = await prisma.$executeRaw`UPDATE User SET cool = ${true} WHERE email = ${'user@email.com'};`
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): PrismaPromise<number>;

  /**
   * Executes a raw query and returns the number of affected rows.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$executeRawUnsafe('UPDATE User SET cool = $1 WHERE email = $2 ;', true, 'user@email.com')
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRawUnsafe<T = unknown>(query: string, ...values: any[]): PrismaPromise<number>;

  /**
   * Performs a prepared raw query and returns the `SELECT` data.
   * @example
   * ```
   * const result = await prisma.$queryRaw`SELECT * FROM User WHERE id = ${1} OR email = ${'user@email.com'};`
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): PrismaPromise<T>;

  /**
   * Performs a raw query and returns the `SELECT` data.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$queryRawUnsafe('SELECT * FROM User WHERE id = $1 OR email = $2;', 1, 'user@email.com')
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRawUnsafe<T = unknown>(query: string, ...values: any[]): PrismaPromise<T>;

  /**
   * Allows the running of a sequence of read/write operations that are guaranteed to either succeed or fail as a whole.
   * @example
   * ```
   * const [george, bob, alice] = await prisma.$transaction([
   *   prisma.user.create({ data: { name: 'George' } }),
   *   prisma.user.create({ data: { name: 'Bob' } }),
   *   prisma.user.create({ data: { name: 'Alice' } }),
   * ])
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/concepts/components/prisma-client/transactions).
   */
  $transaction<P extends PrismaPromise<any>[]>(arg: [...P]): Promise<UnwrapTuple<P>>;

      /**
   * `prisma.adapter`: Exposes CRUD operations for the **Adapter** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Adapters
    * const adapters = await prisma.adapter.findMany()
    * ```
    */
  get adapter(): Prisma.AdapterDelegate<GlobalReject>;

  /**
   * `prisma.board`: Exposes CRUD operations for the **Board** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Boards
    * const boards = await prisma.board.findMany()
    * ```
    */
  get board(): Prisma.BoardDelegate<GlobalReject>;

  /**
   * `prisma.service`: Exposes CRUD operations for the **Service** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Services
    * const services = await prisma.service.findMany()
    * ```
    */
  get service(): Prisma.ServiceDelegate<GlobalReject>;

  /**
   * `prisma.transformer`: Exposes CRUD operations for the **Transformer** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Transformers
    * const transformers = await prisma.transformer.findMany()
    * ```
    */
  get transformer(): Prisma.TransformerDelegate<GlobalReject>;

  /**
   * `prisma.transformerConfig`: Exposes CRUD operations for the **TransformerConfig** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more TransformerConfigs
    * const transformerConfigs = await prisma.transformerConfig.findMany()
    * ```
    */
  get transformerConfig(): Prisma.TransformerConfigDelegate<GlobalReject>;

  /**
   * `prisma.bot`: Exposes CRUD operations for the **Bot** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Bots
    * const bots = await prisma.bot.findMany()
    * ```
    */
  get bot(): Prisma.BotDelegate<GlobalReject>;

  /**
   * `prisma.userSegment`: Exposes CRUD operations for the **UserSegment** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more UserSegments
    * const userSegments = await prisma.userSegment.findMany()
    * ```
    */
  get userSegment(): Prisma.UserSegmentDelegate<GlobalReject>;

  /**
   * `prisma.conversationLogic`: Exposes CRUD operations for the **ConversationLogic** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more ConversationLogics
    * const conversationLogics = await prisma.conversationLogic.findMany()
    * ```
    */
  get conversationLogic(): Prisma.ConversationLogicDelegate<GlobalReject>;
}

export namespace Prisma {
  export import DMMF = runtime.DMMF

  /**
   * Prisma Errors
   */
  export import PrismaClientKnownRequestError = runtime.PrismaClientKnownRequestError
  export import PrismaClientUnknownRequestError = runtime.PrismaClientUnknownRequestError
  export import PrismaClientRustPanicError = runtime.PrismaClientRustPanicError
  export import PrismaClientInitializationError = runtime.PrismaClientInitializationError
  export import PrismaClientValidationError = runtime.PrismaClientValidationError

  /**
   * Re-export of sql-template-tag
   */
  export import sql = runtime.sqltag
  export import empty = runtime.empty
  export import join = runtime.join
  export import raw = runtime.raw
  export import Sql = runtime.Sql

  /**
   * Decimal.js
   */
  export import Decimal = runtime.Decimal

  /**
   * Prisma Client JS version: 3.11.1
   * Query Engine version: 2b0c12756921c891fec4f68d9444e18c7d5d4a6a
   */
  export type PrismaVersion = {
    client: string
  }

  export const prismaVersion: PrismaVersion 

  /**
   * Utility Types
   */

  /**
   * From https://github.com/sindresorhus/type-fest/
   * Matches a JSON object.
   * This type can be useful to enforce some input to be JSON-compatible or as a super-type to be extended from. 
   */
  export type JsonObject = {[Key in string]?: JsonValue}

  /**
   * From https://github.com/sindresorhus/type-fest/
   * Matches a JSON array.
   */
  export interface JsonArray extends Array<JsonValue> {}

  /**
   * From https://github.com/sindresorhus/type-fest/
   * Matches any valid JSON value.
   */
  export type JsonValue = string | number | boolean | JsonObject | JsonArray | null

  /**
   * Matches a JSON object.
   * Unlike `JsonObject`, this type allows undefined and read-only properties.
   */
  export type InputJsonObject = {readonly [Key in string]?: InputJsonValue | null}

  /**
   * Matches a JSON array.
   * Unlike `JsonArray`, readonly arrays are assignable to this type.
   */
  export interface InputJsonArray extends ReadonlyArray<InputJsonValue | null> {}

  /**
   * Matches any valid value that can be used as an input for operations like
   * create and update as the value of a JSON field. Unlike `JsonValue`, this
   * type allows read-only arrays and read-only object properties and disallows
   * `null` at the top level.
   *
   * `null` cannot be used as the value of a JSON field because its meaning
   * would be ambiguous. Use `Prisma.JsonNull` to store the JSON null value or
   * `Prisma.DbNull` to clear the JSON value and set the field to the database
   * NULL value instead.
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-by-null-values
   */
  export type InputJsonValue = string | number | boolean | InputJsonObject | InputJsonArray

  /**
   * Helper for filtering JSON entries that have `null` on the database (empty on the db)
   * 
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const DbNull: 'DbNull'

  /**
   * Helper for filtering JSON entries that have JSON `null` values (not empty on the db)
   * 
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const JsonNull: 'JsonNull'

  /**
   * Helper for filtering JSON entries that are `Prisma.DbNull` or `Prisma.JsonNull`
   * 
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const AnyNull: 'AnyNull'

  type SelectAndInclude = {
    select: any
    include: any
  }
  type HasSelect = {
    select: any
  }
  type HasInclude = {
    include: any
  }
  type CheckSelect<T, S, U> = T extends SelectAndInclude
    ? 'Please either choose `select` or `include`'
    : T extends HasSelect
    ? U
    : T extends HasInclude
    ? U
    : S

  /**
   * Get the type of the value, that the Promise holds.
   */
  export type PromiseType<T extends PromiseLike<any>> = T extends PromiseLike<infer U> ? U : T;

  /**
   * Get the return type of a function which returns a Promise.
   */
  export type PromiseReturnType<T extends (...args: any) => Promise<any>> = PromiseType<ReturnType<T>>

  /**
   * From T, pick a set of properties whose keys are in the union K
   */
  type Prisma__Pick<T, K extends keyof T> = {
      [P in K]: T[P];
  };


  export type Enumerable<T> = T | Array<T>;

  export type RequiredKeys<T> = {
    [K in keyof T]-?: {} extends Prisma__Pick<T, K> ? never : K
  }[keyof T]

  export type TruthyKeys<T> = {
    [key in keyof T]: T[key] extends false | undefined | null ? never : key
  }[keyof T]

  export type TrueKeys<T> = TruthyKeys<Prisma__Pick<T, RequiredKeys<T>>>

  /**
   * Subset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection
   */
  export type Subset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
  };

  /**
   * SelectSubset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection.
   * Additionally, it validates, if both select and include are present. If the case, it errors.
   */
  export type SelectSubset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    (T extends SelectAndInclude
      ? 'Please either choose `select` or `include`.'
      : {})

  /**
   * Subset + Intersection
   * @desc From `T` pick properties that exist in `U` and intersect `K`
   */
  export type SubsetIntersection<T, U, K> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    K

  type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never };

  /**
   * XOR is needed to have a real mutually exclusive union type
   * https://stackoverflow.com/questions/42123407/does-typescript-support-mutually-exclusive-types
   */
  type XOR<T, U> =
    T extends object ?
    U extends object ?
      (Without<T, U> & U) | (Without<U, T> & T)
    : U : T


  /**
   * Is T a Record?
   */
  type IsObject<T extends any> = T extends Array<any>
  ? False
  : T extends Date
  ? False
  : T extends Buffer
  ? False
  : T extends BigInt
  ? False
  : T extends object
  ? True
  : False


  /**
   * If it's T[], return T
   */
  export type UnEnumerate<T extends unknown> = T extends Array<infer U> ? U : T

  /**
   * From ts-toolbelt
   */

  type __Either<O extends object, K extends Key> = Omit<O, K> &
    {
      // Merge all but K
      [P in K]: Prisma__Pick<O, P & keyof O> // With K possibilities
    }[K]

  type EitherStrict<O extends object, K extends Key> = Strict<__Either<O, K>>

  type EitherLoose<O extends object, K extends Key> = ComputeRaw<__Either<O, K>>

  type _Either<
    O extends object,
    K extends Key,
    strict extends Boolean
  > = {
    1: EitherStrict<O, K>
    0: EitherLoose<O, K>
  }[strict]

  type Either<
    O extends object,
    K extends Key,
    strict extends Boolean = 1
  > = O extends unknown ? _Either<O, K, strict> : never

  export type Union = any

  type PatchUndefined<O extends object, O1 extends object> = {
    [K in keyof O]: O[K] extends undefined ? At<O1, K> : O[K]
  } & {}

  /** Helper Types for "Merge" **/
  export type IntersectOf<U extends Union> = (
    U extends unknown ? (k: U) => void : never
  ) extends (k: infer I) => void
    ? I
    : never

  export type Overwrite<O extends object, O1 extends object> = {
      [K in keyof O]: K extends keyof O1 ? O1[K] : O[K];
  } & {};

  type _Merge<U extends object> = IntersectOf<Overwrite<U, {
      [K in keyof U]-?: At<U, K>;
  }>>;

  type Key = string | number | symbol;
  type AtBasic<O extends object, K extends Key> = K extends keyof O ? O[K] : never;
  type AtStrict<O extends object, K extends Key> = O[K & keyof O];
  type AtLoose<O extends object, K extends Key> = O extends unknown ? AtStrict<O, K> : never;
  export type At<O extends object, K extends Key, strict extends Boolean = 1> = {
      1: AtStrict<O, K>;
      0: AtLoose<O, K>;
  }[strict];

  export type ComputeRaw<A extends any> = A extends Function ? A : {
    [K in keyof A]: A[K];
  } & {};

  export type OptionalFlat<O> = {
    [K in keyof O]?: O[K];
  } & {};

  type _Record<K extends keyof any, T> = {
    [P in K]: T;
  };

  type _Strict<U, _U = U> = U extends unknown ? U & OptionalFlat<_Record<Exclude<Keys<_U>, keyof U>, never>> : never;

  export type Strict<U extends object> = ComputeRaw<_Strict<U>>;
  /** End Helper Types for "Merge" **/

  export type Merge<U extends object> = ComputeRaw<_Merge<Strict<U>>>;

  /**
  A [[Boolean]]
  */
  export type Boolean = True | False

  // /**
  // 1
  // */
  export type True = 1

  /**
  0
  */
  export type False = 0

  export type Not<B extends Boolean> = {
    0: 1
    1: 0
  }[B]

  export type Extends<A1 extends any, A2 extends any> = [A1] extends [never]
    ? 0 // anything `never` is false
    : A1 extends A2
    ? 1
    : 0

  export type Has<U extends Union, U1 extends Union> = Not<
    Extends<Exclude<U1, U>, U1>
  >

  export type Or<B1 extends Boolean, B2 extends Boolean> = {
    0: {
      0: 0
      1: 1
    }
    1: {
      0: 1
      1: 1
    }
  }[B1][B2]

  export type Keys<U extends Union> = U extends unknown ? keyof U : never

  type Exact<A, W = unknown> = 
  W extends unknown ? A extends Narrowable ? Cast<A, W> : Cast<
  {[K in keyof A]: K extends keyof W ? Exact<A[K], W[K]> : never},
  {[K in keyof W]: K extends keyof A ? Exact<A[K], W[K]> : W[K]}>
  : never;

  type Narrowable = string | number | boolean | bigint;

  type Cast<A, B> = A extends B ? A : B;

  export const type: unique symbol;

  export function validator<V>(): <S>(select: Exact<S, V>) => S;

  /**
   * Used by group by
   */

  export type GetScalarType<T, O> = O extends object ? {
    [P in keyof T]: P extends keyof O
      ? O[P]
      : never
  } : never

  type FieldPaths<
    T,
    U = Omit<T, '_avg' | '_sum' | '_count' | '_min' | '_max'>
  > = IsObject<T> extends True ? U : T

  type GetHavingFields<T> = {
    [K in keyof T]: Or<
      Or<Extends<'OR', K>, Extends<'AND', K>>,
      Extends<'NOT', K>
    > extends True
      ? // infer is only needed to not hit TS limit
        // based on the brilliant idea of Pierre-Antoine Mills
        // https://github.com/microsoft/TypeScript/issues/30188#issuecomment-478938437
        T[K] extends infer TK
        ? GetHavingFields<UnEnumerate<TK> extends object ? Merge<UnEnumerate<TK>> : never>
        : never
      : {} extends FieldPaths<T[K]>
      ? never
      : K
  }[keyof T]

  /**
   * Convert tuple to union
   */
  type _TupleToUnion<T> = T extends (infer E)[] ? E : never
  type TupleToUnion<K extends readonly any[]> = _TupleToUnion<K>
  type MaybeTupleToUnion<T> = T extends any[] ? TupleToUnion<T> : T

  /**
   * Like `Pick`, but with an array
   */
  type PickArray<T, K extends Array<keyof T>> = Prisma__Pick<T, TupleToUnion<K>>

  /**
   * Exclude all keys with underscores
   */
  type ExcludeUnderscoreKeys<T extends string> = T extends `_${string}` ? never : T

  class PrismaClientFetcher {
    private readonly prisma;
    private readonly debug;
    private readonly hooks?;
    constructor(prisma: PrismaClient<any, any>, debug?: boolean, hooks?: Hooks | undefined);
    request<T>(document: any, dataPath?: string[], rootField?: string, typeName?: string, isList?: boolean, callsite?: string): Promise<T>;
    sanitizeMessage(message: string): string;
    protected unpack(document: any, data: any, path: string[], rootField?: string, isList?: boolean): any;
  }

  export const ModelName: {
    Adapter: 'Adapter',
    Board: 'Board',
    Service: 'Service',
    Transformer: 'Transformer',
    TransformerConfig: 'TransformerConfig',
    Bot: 'Bot',
    UserSegment: 'UserSegment',
    ConversationLogic: 'ConversationLogic'
  };

  export type ModelName = (typeof ModelName)[keyof typeof ModelName]


  export type Datasources = {
    db?: Datasource
  }

  export type RejectOnNotFound = boolean | ((error: Error) => Error)
  export type RejectPerModel = { [P in ModelName]?: RejectOnNotFound }
  export type RejectPerOperation =  { [P in "findUnique" | "findFirst"]?: RejectPerModel | RejectOnNotFound } 
  type IsReject<T> = T extends true ? True : T extends (err: Error) => Error ? True : False
  export type HasReject<
    GlobalRejectSettings extends Prisma.PrismaClientOptions['rejectOnNotFound'],
    LocalRejectSettings,
    Action extends PrismaAction,
    Model extends ModelName
  > = LocalRejectSettings extends RejectOnNotFound
    ? IsReject<LocalRejectSettings>
    : GlobalRejectSettings extends RejectPerOperation
    ? Action extends keyof GlobalRejectSettings
      ? GlobalRejectSettings[Action] extends RejectOnNotFound
        ? IsReject<GlobalRejectSettings[Action]>
        : GlobalRejectSettings[Action] extends RejectPerModel
        ? Model extends keyof GlobalRejectSettings[Action]
          ? IsReject<GlobalRejectSettings[Action][Model]>
          : False
        : False
      : False
    : IsReject<GlobalRejectSettings>
  export type ErrorFormat = 'pretty' | 'colorless' | 'minimal'

  export interface PrismaClientOptions {
    /**
     * Configure findUnique/findFirst to throw an error if the query returns null. 
     *  * @example
     * ```
     * // Reject on both findUnique/findFirst
     * rejectOnNotFound: true
     * // Reject only on findFirst with a custom error
     * rejectOnNotFound: { findFirst: (err) => new Error("Custom Error")}
     * // Reject on user.findUnique with a custom error
     * rejectOnNotFound: { findUnique: {User: (err) => new Error("User not found")}}
     * ```
     */
    rejectOnNotFound?: RejectOnNotFound | RejectPerOperation
    /**
     * Overwrites the datasource url from your prisma.schema file
     */
    datasources?: Datasources

    /**
     * @default "colorless"
     */
    errorFormat?: ErrorFormat

    /**
     * @example
     * ```
     * // Defaults to stdout
     * log: ['query', 'info', 'warn', 'error']
     * 
     * // Emit as events
     * log: [
     *  { emit: 'stdout', level: 'query' },
     *  { emit: 'stdout', level: 'info' },
     *  { emit: 'stdout', level: 'warn' }
     *  { emit: 'stdout', level: 'error' }
     * ]
     * ```
     * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/logging#the-log-option).
     */
    log?: Array<LogLevel | LogDefinition>
  }

  export type Hooks = {
    beforeRequest?: (options: { query: string, path: string[], rootField?: string, typeName?: string, document: any }) => any
  }

  /* Types for Logging */
  export type LogLevel = 'info' | 'query' | 'warn' | 'error'
  export type LogDefinition = {
    level: LogLevel
    emit: 'stdout' | 'event'
  }

  export type GetLogType<T extends LogLevel | LogDefinition> = T extends LogDefinition ? T['emit'] extends 'event' ? T['level'] : never : never
  export type GetEvents<T extends any> = T extends Array<LogLevel | LogDefinition> ?
    GetLogType<T[0]> | GetLogType<T[1]> | GetLogType<T[2]> | GetLogType<T[3]>
    : never

  export type QueryEvent = {
    timestamp: Date
    query: string
    params: string
    duration: number
    target: string
  }

  export type LogEvent = {
    timestamp: Date
    message: string
    target: string
  }
  /* End Types for Logging */


  export type PrismaAction =
    | 'findUnique'
    | 'findMany'
    | 'findFirst'
    | 'create'
    | 'createMany'
    | 'update'
    | 'updateMany'
    | 'upsert'
    | 'delete'
    | 'deleteMany'
    | 'executeRaw'
    | 'queryRaw'
    | 'aggregate'
    | 'count'
    | 'runCommandRaw'

  /**
   * These options are being passed in to the middleware as "params"
   */
  export type MiddlewareParams = {
    model?: ModelName
    action: PrismaAction
    args: any
    dataPath: string[]
    runInTransaction: boolean
  }

  /**
   * The `T` type makes sure, that the `return proceed` is not forgotten in the middleware implementation
   */
  export type Middleware<T = any> = (
    params: MiddlewareParams,
    next: (params: MiddlewareParams) => Promise<T>,
  ) => Promise<T>

  // tested in getLogLevel.test.ts
  export function getLogLevel(log: Array<LogLevel | LogDefinition>): LogLevel | undefined; 
  export type Datasource = {
    url?: string
  }

  /**
   * Count Types
   */


  /**
   * Count Type AdapterCountOutputType
   */


  export type AdapterCountOutputType = {
    ConversationLogic: number
  }

  export type AdapterCountOutputTypeSelect = {
    ConversationLogic?: boolean
  }

  export type AdapterCountOutputTypeGetPayload<
    S extends boolean | null | undefined | AdapterCountOutputTypeArgs,
    U = keyof S
      > = S extends true
        ? AdapterCountOutputType
    : S extends undefined
    ? never
    : S extends AdapterCountOutputTypeArgs
    ?'include' extends U
    ? AdapterCountOutputType 
    : 'select' extends U
    ? {
    [P in TrueKeys<S['select']>]:
    P extends keyof AdapterCountOutputType ? AdapterCountOutputType[P] : never
  } 
    : AdapterCountOutputType
  : AdapterCountOutputType




  // Custom InputTypes

  /**
   * AdapterCountOutputType without action
   */
  export type AdapterCountOutputTypeArgs = {
    /**
     * Select specific fields to fetch from the AdapterCountOutputType
     * 
    **/
    select?: AdapterCountOutputTypeSelect | null
  }



  /**
   * Count Type ServiceCountOutputType
   */


  export type ServiceCountOutputType = {
    Transformer: number
    UserSegmentByID: number
    UserSegmentByPhone: number
    UserSegmentAll: number
  }

  export type ServiceCountOutputTypeSelect = {
    Transformer?: boolean
    UserSegmentByID?: boolean
    UserSegmentByPhone?: boolean
    UserSegmentAll?: boolean
  }

  export type ServiceCountOutputTypeGetPayload<
    S extends boolean | null | undefined | ServiceCountOutputTypeArgs,
    U = keyof S
      > = S extends true
        ? ServiceCountOutputType
    : S extends undefined
    ? never
    : S extends ServiceCountOutputTypeArgs
    ?'include' extends U
    ? ServiceCountOutputType 
    : 'select' extends U
    ? {
    [P in TrueKeys<S['select']>]:
    P extends keyof ServiceCountOutputType ? ServiceCountOutputType[P] : never
  } 
    : ServiceCountOutputType
  : ServiceCountOutputType




  // Custom InputTypes

  /**
   * ServiceCountOutputType without action
   */
  export type ServiceCountOutputTypeArgs = {
    /**
     * Select specific fields to fetch from the ServiceCountOutputType
     * 
    **/
    select?: ServiceCountOutputTypeSelect | null
  }



  /**
   * Count Type TransformerCountOutputType
   */


  export type TransformerCountOutputType = {
    TranformerConfig: number
  }

  export type TransformerCountOutputTypeSelect = {
    TranformerConfig?: boolean
  }

  export type TransformerCountOutputTypeGetPayload<
    S extends boolean | null | undefined | TransformerCountOutputTypeArgs,
    U = keyof S
      > = S extends true
        ? TransformerCountOutputType
    : S extends undefined
    ? never
    : S extends TransformerCountOutputTypeArgs
    ?'include' extends U
    ? TransformerCountOutputType 
    : 'select' extends U
    ? {
    [P in TrueKeys<S['select']>]:
    P extends keyof TransformerCountOutputType ? TransformerCountOutputType[P] : never
  } 
    : TransformerCountOutputType
  : TransformerCountOutputType




  // Custom InputTypes

  /**
   * TransformerCountOutputType without action
   */
  export type TransformerCountOutputTypeArgs = {
    /**
     * Select specific fields to fetch from the TransformerCountOutputType
     * 
    **/
    select?: TransformerCountOutputTypeSelect | null
  }



  /**
   * Count Type BotCountOutputType
   */


  export type BotCountOutputType = {
    users: number
    logicIDs: number
  }

  export type BotCountOutputTypeSelect = {
    users?: boolean
    logicIDs?: boolean
  }

  export type BotCountOutputTypeGetPayload<
    S extends boolean | null | undefined | BotCountOutputTypeArgs,
    U = keyof S
      > = S extends true
        ? BotCountOutputType
    : S extends undefined
    ? never
    : S extends BotCountOutputTypeArgs
    ?'include' extends U
    ? BotCountOutputType 
    : 'select' extends U
    ? {
    [P in TrueKeys<S['select']>]:
    P extends keyof BotCountOutputType ? BotCountOutputType[P] : never
  } 
    : BotCountOutputType
  : BotCountOutputType




  // Custom InputTypes

  /**
   * BotCountOutputType without action
   */
  export type BotCountOutputTypeArgs = {
    /**
     * Select specific fields to fetch from the BotCountOutputType
     * 
    **/
    select?: BotCountOutputTypeSelect | null
  }



  /**
   * Count Type UserSegmentCountOutputType
   */


  export type UserSegmentCountOutputType = {
    bots: number
  }

  export type UserSegmentCountOutputTypeSelect = {
    bots?: boolean
  }

  export type UserSegmentCountOutputTypeGetPayload<
    S extends boolean | null | undefined | UserSegmentCountOutputTypeArgs,
    U = keyof S
      > = S extends true
        ? UserSegmentCountOutputType
    : S extends undefined
    ? never
    : S extends UserSegmentCountOutputTypeArgs
    ?'include' extends U
    ? UserSegmentCountOutputType 
    : 'select' extends U
    ? {
    [P in TrueKeys<S['select']>]:
    P extends keyof UserSegmentCountOutputType ? UserSegmentCountOutputType[P] : never
  } 
    : UserSegmentCountOutputType
  : UserSegmentCountOutputType




  // Custom InputTypes

  /**
   * UserSegmentCountOutputType without action
   */
  export type UserSegmentCountOutputTypeArgs = {
    /**
     * Select specific fields to fetch from the UserSegmentCountOutputType
     * 
    **/
    select?: UserSegmentCountOutputTypeSelect | null
  }



  /**
   * Count Type ConversationLogicCountOutputType
   */


  export type ConversationLogicCountOutputType = {
    bots: number
    transformers: number
  }

  export type ConversationLogicCountOutputTypeSelect = {
    bots?: boolean
    transformers?: boolean
  }

  export type ConversationLogicCountOutputTypeGetPayload<
    S extends boolean | null | undefined | ConversationLogicCountOutputTypeArgs,
    U = keyof S
      > = S extends true
        ? ConversationLogicCountOutputType
    : S extends undefined
    ? never
    : S extends ConversationLogicCountOutputTypeArgs
    ?'include' extends U
    ? ConversationLogicCountOutputType 
    : 'select' extends U
    ? {
    [P in TrueKeys<S['select']>]:
    P extends keyof ConversationLogicCountOutputType ? ConversationLogicCountOutputType[P] : never
  } 
    : ConversationLogicCountOutputType
  : ConversationLogicCountOutputType




  // Custom InputTypes

  /**
   * ConversationLogicCountOutputType without action
   */
  export type ConversationLogicCountOutputTypeArgs = {
    /**
     * Select specific fields to fetch from the ConversationLogicCountOutputType
     * 
    **/
    select?: ConversationLogicCountOutputTypeSelect | null
  }



  /**
   * Models
   */

  /**
   * Model Adapter
   */


  export type AggregateAdapter = {
    _count: AdapterCountAggregateOutputType | null
    _min: AdapterMinAggregateOutputType | null
    _max: AdapterMaxAggregateOutputType | null
  }

  export type AdapterMinAggregateOutputType = {
    id: string | null
    createdAt: Date | null
    updatedAt: Date | null
    channel: string | null
    provider: string | null
    name: string | null
  }

  export type AdapterMaxAggregateOutputType = {
    id: string | null
    createdAt: Date | null
    updatedAt: Date | null
    channel: string | null
    provider: string | null
    name: string | null
  }

  export type AdapterCountAggregateOutputType = {
    id: number
    createdAt: number
    updatedAt: number
    channel: number
    provider: number
    config: number
    name: number
    _all: number
  }


  export type AdapterMinAggregateInputType = {
    id?: true
    createdAt?: true
    updatedAt?: true
    channel?: true
    provider?: true
    name?: true
  }

  export type AdapterMaxAggregateInputType = {
    id?: true
    createdAt?: true
    updatedAt?: true
    channel?: true
    provider?: true
    name?: true
  }

  export type AdapterCountAggregateInputType = {
    id?: true
    createdAt?: true
    updatedAt?: true
    channel?: true
    provider?: true
    config?: true
    name?: true
    _all?: true
  }

  export type AdapterAggregateArgs = {
    /**
     * Filter which Adapter to aggregate.
     * 
    **/
    where?: AdapterWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Adapters to fetch.
     * 
    **/
    orderBy?: Enumerable<AdapterOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     * 
    **/
    cursor?: AdapterWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Adapters from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Adapters.
     * 
    **/
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Adapters
    **/
    _count?: true | AdapterCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: AdapterMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: AdapterMaxAggregateInputType
  }

  export type GetAdapterAggregateType<T extends AdapterAggregateArgs> = {
        [P in keyof T & keyof AggregateAdapter]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateAdapter[P]>
      : GetScalarType<T[P], AggregateAdapter[P]>
  }




  export type AdapterGroupByArgs = {
    where?: AdapterWhereInput
    orderBy?: Enumerable<AdapterOrderByWithAggregationInput>
    by: Array<AdapterScalarFieldEnum>
    having?: AdapterScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: AdapterCountAggregateInputType | true
    _min?: AdapterMinAggregateInputType
    _max?: AdapterMaxAggregateInputType
  }


  export type AdapterGroupByOutputType = {
    id: string
    createdAt: Date
    updatedAt: Date
    channel: string
    provider: string
    config: JsonValue
    name: string
    _count: AdapterCountAggregateOutputType | null
    _min: AdapterMinAggregateOutputType | null
    _max: AdapterMaxAggregateOutputType | null
  }

  type GetAdapterGroupByPayload<T extends AdapterGroupByArgs> = PrismaPromise<
    Array<
      PickArray<AdapterGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof AdapterGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], AdapterGroupByOutputType[P]>
            : GetScalarType<T[P], AdapterGroupByOutputType[P]>
        }
      >
    >


  export type AdapterSelect = {
    id?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    channel?: boolean
    provider?: boolean
    config?: boolean
    name?: boolean
    ConversationLogic?: boolean | ConversationLogicFindManyArgs
    _count?: boolean | AdapterCountOutputTypeArgs
  }

  export type AdapterInclude = {
    ConversationLogic?: boolean | ConversationLogicFindManyArgs
    _count?: boolean | AdapterCountOutputTypeArgs
  }

  export type AdapterGetPayload<
    S extends boolean | null | undefined | AdapterArgs,
    U = keyof S
      > = S extends true
        ? Adapter
    : S extends undefined
    ? never
    : S extends AdapterArgs | AdapterFindManyArgs
    ?'include' extends U
    ? Adapter  & {
    [P in TrueKeys<S['include']>]:
        P extends 'ConversationLogic' ? Array < ConversationLogicGetPayload<S['include'][P]>>  :
        P extends '_count' ? AdapterCountOutputTypeGetPayload<S['include'][P]> :  never
  } 
    : 'select' extends U
    ? {
    [P in TrueKeys<S['select']>]:
        P extends 'ConversationLogic' ? Array < ConversationLogicGetPayload<S['select'][P]>>  :
        P extends '_count' ? AdapterCountOutputTypeGetPayload<S['select'][P]> :  P extends keyof Adapter ? Adapter[P] : never
  } 
    : Adapter
  : Adapter


  type AdapterCountArgs = Merge<
    Omit<AdapterFindManyArgs, 'select' | 'include'> & {
      select?: AdapterCountAggregateInputType | true
    }
  >

  export interface AdapterDelegate<GlobalRejectSettings> {
    /**
     * Find zero or one Adapter that matches the filter.
     * @param {AdapterFindUniqueArgs} args - Arguments to find a Adapter
     * @example
     * // Get one Adapter
     * const adapter = await prisma.adapter.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUnique<T extends AdapterFindUniqueArgs,  LocalRejectSettings = T["rejectOnNotFound"] extends RejectOnNotFound ? T['rejectOnNotFound'] : undefined>(
      args: SelectSubset<T, AdapterFindUniqueArgs>
    ): HasReject<GlobalRejectSettings, LocalRejectSettings, 'findUnique', 'Adapter'> extends True ? CheckSelect<T, Prisma__AdapterClient<Adapter>, Prisma__AdapterClient<AdapterGetPayload<T>>> : CheckSelect<T, Prisma__AdapterClient<Adapter | null >, Prisma__AdapterClient<AdapterGetPayload<T> | null >>

    /**
     * Find the first Adapter that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AdapterFindFirstArgs} args - Arguments to find a Adapter
     * @example
     * // Get one Adapter
     * const adapter = await prisma.adapter.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirst<T extends AdapterFindFirstArgs,  LocalRejectSettings = T["rejectOnNotFound"] extends RejectOnNotFound ? T['rejectOnNotFound'] : undefined>(
      args?: SelectSubset<T, AdapterFindFirstArgs>
    ): HasReject<GlobalRejectSettings, LocalRejectSettings, 'findFirst', 'Adapter'> extends True ? CheckSelect<T, Prisma__AdapterClient<Adapter>, Prisma__AdapterClient<AdapterGetPayload<T>>> : CheckSelect<T, Prisma__AdapterClient<Adapter | null >, Prisma__AdapterClient<AdapterGetPayload<T> | null >>

    /**
     * Find zero or more Adapters that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AdapterFindManyArgs=} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Adapters
     * const adapters = await prisma.adapter.findMany()
     * 
     * // Get first 10 Adapters
     * const adapters = await prisma.adapter.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const adapterWithIdOnly = await prisma.adapter.findMany({ select: { id: true } })
     * 
    **/
    findMany<T extends AdapterFindManyArgs>(
      args?: SelectSubset<T, AdapterFindManyArgs>
    ): CheckSelect<T, PrismaPromise<Array<Adapter>>, PrismaPromise<Array<AdapterGetPayload<T>>>>

    /**
     * Create a Adapter.
     * @param {AdapterCreateArgs} args - Arguments to create a Adapter.
     * @example
     * // Create one Adapter
     * const Adapter = await prisma.adapter.create({
     *   data: {
     *     // ... data to create a Adapter
     *   }
     * })
     * 
    **/
    create<T extends AdapterCreateArgs>(
      args: SelectSubset<T, AdapterCreateArgs>
    ): CheckSelect<T, Prisma__AdapterClient<Adapter>, Prisma__AdapterClient<AdapterGetPayload<T>>>

    /**
     * Create many Adapters.
     *     @param {AdapterCreateManyArgs} args - Arguments to create many Adapters.
     *     @example
     *     // Create many Adapters
     *     const adapter = await prisma.adapter.createMany({
     *       data: {
     *         // ... provide data here
     *       }
     *     })
     *     
    **/
    createMany<T extends AdapterCreateManyArgs>(
      args?: SelectSubset<T, AdapterCreateManyArgs>
    ): PrismaPromise<BatchPayload>

    /**
     * Delete a Adapter.
     * @param {AdapterDeleteArgs} args - Arguments to delete one Adapter.
     * @example
     * // Delete one Adapter
     * const Adapter = await prisma.adapter.delete({
     *   where: {
     *     // ... filter to delete one Adapter
     *   }
     * })
     * 
    **/
    delete<T extends AdapterDeleteArgs>(
      args: SelectSubset<T, AdapterDeleteArgs>
    ): CheckSelect<T, Prisma__AdapterClient<Adapter>, Prisma__AdapterClient<AdapterGetPayload<T>>>

    /**
     * Update one Adapter.
     * @param {AdapterUpdateArgs} args - Arguments to update one Adapter.
     * @example
     * // Update one Adapter
     * const adapter = await prisma.adapter.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    update<T extends AdapterUpdateArgs>(
      args: SelectSubset<T, AdapterUpdateArgs>
    ): CheckSelect<T, Prisma__AdapterClient<Adapter>, Prisma__AdapterClient<AdapterGetPayload<T>>>

    /**
     * Delete zero or more Adapters.
     * @param {AdapterDeleteManyArgs} args - Arguments to filter Adapters to delete.
     * @example
     * // Delete a few Adapters
     * const { count } = await prisma.adapter.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
    **/
    deleteMany<T extends AdapterDeleteManyArgs>(
      args?: SelectSubset<T, AdapterDeleteManyArgs>
    ): PrismaPromise<BatchPayload>

    /**
     * Update zero or more Adapters.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AdapterUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Adapters
     * const adapter = await prisma.adapter.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    updateMany<T extends AdapterUpdateManyArgs>(
      args: SelectSubset<T, AdapterUpdateManyArgs>
    ): PrismaPromise<BatchPayload>

    /**
     * Create or update one Adapter.
     * @param {AdapterUpsertArgs} args - Arguments to update or create a Adapter.
     * @example
     * // Update or create a Adapter
     * const adapter = await prisma.adapter.upsert({
     *   create: {
     *     // ... data to create a Adapter
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Adapter we want to update
     *   }
     * })
    **/
    upsert<T extends AdapterUpsertArgs>(
      args: SelectSubset<T, AdapterUpsertArgs>
    ): CheckSelect<T, Prisma__AdapterClient<Adapter>, Prisma__AdapterClient<AdapterGetPayload<T>>>

    /**
     * Count the number of Adapters.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AdapterCountArgs} args - Arguments to filter Adapters to count.
     * @example
     * // Count the number of Adapters
     * const count = await prisma.adapter.count({
     *   where: {
     *     // ... the filter for the Adapters we want to count
     *   }
     * })
    **/
    count<T extends AdapterCountArgs>(
      args?: Subset<T, AdapterCountArgs>,
    ): PrismaPromise<
      T extends _Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], AdapterCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Adapter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AdapterAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends AdapterAggregateArgs>(args: Subset<T, AdapterAggregateArgs>): PrismaPromise<GetAdapterAggregateType<T>>

    /**
     * Group by Adapter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AdapterGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends AdapterGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: AdapterGroupByArgs['orderBy'] }
        : { orderBy?: AdapterGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends TupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, AdapterGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetAdapterGroupByPayload<T> : PrismaPromise<InputErrors>
  }

  /**
   * The delegate class that acts as a "Promise-like" for Adapter.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export class Prisma__AdapterClient<T> implements PrismaPromise<T> {
    [prisma]: true;
    private readonly _dmmf;
    private readonly _fetcher;
    private readonly _queryType;
    private readonly _rootField;
    private readonly _clientMethod;
    private readonly _args;
    private readonly _dataPath;
    private readonly _errorFormat;
    private readonly _measurePerformance?;
    private _isList;
    private _callsite;
    private _requestPromise?;
    constructor(_dmmf: runtime.DMMFClass, _fetcher: PrismaClientFetcher, _queryType: 'query' | 'mutation', _rootField: string, _clientMethod: string, _args: any, _dataPath: string[], _errorFormat: ErrorFormat, _measurePerformance?: boolean | undefined, _isList?: boolean);
    readonly [Symbol.toStringTag]: 'PrismaClientPromise';

    ConversationLogic<T extends ConversationLogicFindManyArgs = {}>(args?: Subset<T, ConversationLogicFindManyArgs>): CheckSelect<T, PrismaPromise<Array<ConversationLogic>>, PrismaPromise<Array<ConversationLogicGetPayload<T>>>>;

    private get _document();
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): Promise<TResult1 | TResult2>;
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): Promise<T | TResult>;
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): Promise<T>;
  }

  // Custom InputTypes

  /**
   * Adapter findUnique
   */
  export type AdapterFindUniqueArgs = {
    /**
     * Select specific fields to fetch from the Adapter
     * 
    **/
    select?: AdapterSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: AdapterInclude | null
    /**
     * Throw an Error if a Adapter can't be found
     * 
    **/
    rejectOnNotFound?: RejectOnNotFound
    /**
     * Filter, which Adapter to fetch.
     * 
    **/
    where: AdapterWhereUniqueInput
  }


  /**
   * Adapter findFirst
   */
  export type AdapterFindFirstArgs = {
    /**
     * Select specific fields to fetch from the Adapter
     * 
    **/
    select?: AdapterSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: AdapterInclude | null
    /**
     * Throw an Error if a Adapter can't be found
     * 
    **/
    rejectOnNotFound?: RejectOnNotFound
    /**
     * Filter, which Adapter to fetch.
     * 
    **/
    where?: AdapterWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Adapters to fetch.
     * 
    **/
    orderBy?: Enumerable<AdapterOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Adapters.
     * 
    **/
    cursor?: AdapterWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Adapters from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Adapters.
     * 
    **/
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Adapters.
     * 
    **/
    distinct?: Enumerable<AdapterScalarFieldEnum>
  }


  /**
   * Adapter findMany
   */
  export type AdapterFindManyArgs = {
    /**
     * Select specific fields to fetch from the Adapter
     * 
    **/
    select?: AdapterSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: AdapterInclude | null
    /**
     * Filter, which Adapters to fetch.
     * 
    **/
    where?: AdapterWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Adapters to fetch.
     * 
    **/
    orderBy?: Enumerable<AdapterOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Adapters.
     * 
    **/
    cursor?: AdapterWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Adapters from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Adapters.
     * 
    **/
    skip?: number
    distinct?: Enumerable<AdapterScalarFieldEnum>
  }


  /**
   * Adapter create
   */
  export type AdapterCreateArgs = {
    /**
     * Select specific fields to fetch from the Adapter
     * 
    **/
    select?: AdapterSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: AdapterInclude | null
    /**
     * The data needed to create a Adapter.
     * 
    **/
    data: XOR<AdapterCreateInput, AdapterUncheckedCreateInput>
  }


  /**
   * Adapter createMany
   */
  export type AdapterCreateManyArgs = {
    /**
     * The data used to create many Adapters.
     * 
    **/
    data: Enumerable<AdapterCreateManyInput>
    skipDuplicates?: boolean
  }


  /**
   * Adapter update
   */
  export type AdapterUpdateArgs = {
    /**
     * Select specific fields to fetch from the Adapter
     * 
    **/
    select?: AdapterSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: AdapterInclude | null
    /**
     * The data needed to update a Adapter.
     * 
    **/
    data: XOR<AdapterUpdateInput, AdapterUncheckedUpdateInput>
    /**
     * Choose, which Adapter to update.
     * 
    **/
    where: AdapterWhereUniqueInput
  }


  /**
   * Adapter updateMany
   */
  export type AdapterUpdateManyArgs = {
    /**
     * The data used to update Adapters.
     * 
    **/
    data: XOR<AdapterUpdateManyMutationInput, AdapterUncheckedUpdateManyInput>
    /**
     * Filter which Adapters to update
     * 
    **/
    where?: AdapterWhereInput
  }


  /**
   * Adapter upsert
   */
  export type AdapterUpsertArgs = {
    /**
     * Select specific fields to fetch from the Adapter
     * 
    **/
    select?: AdapterSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: AdapterInclude | null
    /**
     * The filter to search for the Adapter to update in case it exists.
     * 
    **/
    where: AdapterWhereUniqueInput
    /**
     * In case the Adapter found by the `where` argument doesn't exist, create a new Adapter with this data.
     * 
    **/
    create: XOR<AdapterCreateInput, AdapterUncheckedCreateInput>
    /**
     * In case the Adapter was found with the provided `where` argument, update it with this data.
     * 
    **/
    update: XOR<AdapterUpdateInput, AdapterUncheckedUpdateInput>
  }


  /**
   * Adapter delete
   */
  export type AdapterDeleteArgs = {
    /**
     * Select specific fields to fetch from the Adapter
     * 
    **/
    select?: AdapterSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: AdapterInclude | null
    /**
     * Filter which Adapter to delete.
     * 
    **/
    where: AdapterWhereUniqueInput
  }


  /**
   * Adapter deleteMany
   */
  export type AdapterDeleteManyArgs = {
    /**
     * Filter which Adapters to delete
     * 
    **/
    where?: AdapterWhereInput
  }


  /**
   * Adapter without action
   */
  export type AdapterArgs = {
    /**
     * Select specific fields to fetch from the Adapter
     * 
    **/
    select?: AdapterSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: AdapterInclude | null
  }



  /**
   * Model Board
   */


  export type AggregateBoard = {
    _count: BoardCountAggregateOutputType | null
    _avg: BoardAvgAggregateOutputType | null
    _sum: BoardSumAggregateOutputType | null
    _min: BoardMinAggregateOutputType | null
    _max: BoardMaxAggregateOutputType | null
  }

  export type BoardAvgAggregateOutputType = {
    id: number | null
  }

  export type BoardSumAggregateOutputType = {
    id: number | null
  }

  export type BoardMinAggregateOutputType = {
    id: number | null
    name: string | null
  }

  export type BoardMaxAggregateOutputType = {
    id: number | null
    name: string | null
  }

  export type BoardCountAggregateOutputType = {
    id: number
    name: number
    _all: number
  }


  export type BoardAvgAggregateInputType = {
    id?: true
  }

  export type BoardSumAggregateInputType = {
    id?: true
  }

  export type BoardMinAggregateInputType = {
    id?: true
    name?: true
  }

  export type BoardMaxAggregateInputType = {
    id?: true
    name?: true
  }

  export type BoardCountAggregateInputType = {
    id?: true
    name?: true
    _all?: true
  }

  export type BoardAggregateArgs = {
    /**
     * Filter which Board to aggregate.
     * 
    **/
    where?: BoardWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Boards to fetch.
     * 
    **/
    orderBy?: Enumerable<BoardOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     * 
    **/
    cursor?: BoardWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Boards from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Boards.
     * 
    **/
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Boards
    **/
    _count?: true | BoardCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: BoardAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: BoardSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: BoardMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: BoardMaxAggregateInputType
  }

  export type GetBoardAggregateType<T extends BoardAggregateArgs> = {
        [P in keyof T & keyof AggregateBoard]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateBoard[P]>
      : GetScalarType<T[P], AggregateBoard[P]>
  }




  export type BoardGroupByArgs = {
    where?: BoardWhereInput
    orderBy?: Enumerable<BoardOrderByWithAggregationInput>
    by: Array<BoardScalarFieldEnum>
    having?: BoardScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: BoardCountAggregateInputType | true
    _avg?: BoardAvgAggregateInputType
    _sum?: BoardSumAggregateInputType
    _min?: BoardMinAggregateInputType
    _max?: BoardMaxAggregateInputType
  }


  export type BoardGroupByOutputType = {
    id: number
    name: string
    _count: BoardCountAggregateOutputType | null
    _avg: BoardAvgAggregateOutputType | null
    _sum: BoardSumAggregateOutputType | null
    _min: BoardMinAggregateOutputType | null
    _max: BoardMaxAggregateOutputType | null
  }

  type GetBoardGroupByPayload<T extends BoardGroupByArgs> = PrismaPromise<
    Array<
      PickArray<BoardGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof BoardGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], BoardGroupByOutputType[P]>
            : GetScalarType<T[P], BoardGroupByOutputType[P]>
        }
      >
    >


  export type BoardSelect = {
    id?: boolean
    name?: boolean
  }

  export type BoardGetPayload<
    S extends boolean | null | undefined | BoardArgs,
    U = keyof S
      > = S extends true
        ? Board
    : S extends undefined
    ? never
    : S extends BoardArgs | BoardFindManyArgs
    ?'include' extends U
    ? Board 
    : 'select' extends U
    ? {
    [P in TrueKeys<S['select']>]:
    P extends keyof Board ? Board[P] : never
  } 
    : Board
  : Board


  type BoardCountArgs = Merge<
    Omit<BoardFindManyArgs, 'select' | 'include'> & {
      select?: BoardCountAggregateInputType | true
    }
  >

  export interface BoardDelegate<GlobalRejectSettings> {
    /**
     * Find zero or one Board that matches the filter.
     * @param {BoardFindUniqueArgs} args - Arguments to find a Board
     * @example
     * // Get one Board
     * const board = await prisma.board.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUnique<T extends BoardFindUniqueArgs,  LocalRejectSettings = T["rejectOnNotFound"] extends RejectOnNotFound ? T['rejectOnNotFound'] : undefined>(
      args: SelectSubset<T, BoardFindUniqueArgs>
    ): HasReject<GlobalRejectSettings, LocalRejectSettings, 'findUnique', 'Board'> extends True ? CheckSelect<T, Prisma__BoardClient<Board>, Prisma__BoardClient<BoardGetPayload<T>>> : CheckSelect<T, Prisma__BoardClient<Board | null >, Prisma__BoardClient<BoardGetPayload<T> | null >>

    /**
     * Find the first Board that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BoardFindFirstArgs} args - Arguments to find a Board
     * @example
     * // Get one Board
     * const board = await prisma.board.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirst<T extends BoardFindFirstArgs,  LocalRejectSettings = T["rejectOnNotFound"] extends RejectOnNotFound ? T['rejectOnNotFound'] : undefined>(
      args?: SelectSubset<T, BoardFindFirstArgs>
    ): HasReject<GlobalRejectSettings, LocalRejectSettings, 'findFirst', 'Board'> extends True ? CheckSelect<T, Prisma__BoardClient<Board>, Prisma__BoardClient<BoardGetPayload<T>>> : CheckSelect<T, Prisma__BoardClient<Board | null >, Prisma__BoardClient<BoardGetPayload<T> | null >>

    /**
     * Find zero or more Boards that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BoardFindManyArgs=} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Boards
     * const boards = await prisma.board.findMany()
     * 
     * // Get first 10 Boards
     * const boards = await prisma.board.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const boardWithIdOnly = await prisma.board.findMany({ select: { id: true } })
     * 
    **/
    findMany<T extends BoardFindManyArgs>(
      args?: SelectSubset<T, BoardFindManyArgs>
    ): CheckSelect<T, PrismaPromise<Array<Board>>, PrismaPromise<Array<BoardGetPayload<T>>>>

    /**
     * Create a Board.
     * @param {BoardCreateArgs} args - Arguments to create a Board.
     * @example
     * // Create one Board
     * const Board = await prisma.board.create({
     *   data: {
     *     // ... data to create a Board
     *   }
     * })
     * 
    **/
    create<T extends BoardCreateArgs>(
      args: SelectSubset<T, BoardCreateArgs>
    ): CheckSelect<T, Prisma__BoardClient<Board>, Prisma__BoardClient<BoardGetPayload<T>>>

    /**
     * Create many Boards.
     *     @param {BoardCreateManyArgs} args - Arguments to create many Boards.
     *     @example
     *     // Create many Boards
     *     const board = await prisma.board.createMany({
     *       data: {
     *         // ... provide data here
     *       }
     *     })
     *     
    **/
    createMany<T extends BoardCreateManyArgs>(
      args?: SelectSubset<T, BoardCreateManyArgs>
    ): PrismaPromise<BatchPayload>

    /**
     * Delete a Board.
     * @param {BoardDeleteArgs} args - Arguments to delete one Board.
     * @example
     * // Delete one Board
     * const Board = await prisma.board.delete({
     *   where: {
     *     // ... filter to delete one Board
     *   }
     * })
     * 
    **/
    delete<T extends BoardDeleteArgs>(
      args: SelectSubset<T, BoardDeleteArgs>
    ): CheckSelect<T, Prisma__BoardClient<Board>, Prisma__BoardClient<BoardGetPayload<T>>>

    /**
     * Update one Board.
     * @param {BoardUpdateArgs} args - Arguments to update one Board.
     * @example
     * // Update one Board
     * const board = await prisma.board.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    update<T extends BoardUpdateArgs>(
      args: SelectSubset<T, BoardUpdateArgs>
    ): CheckSelect<T, Prisma__BoardClient<Board>, Prisma__BoardClient<BoardGetPayload<T>>>

    /**
     * Delete zero or more Boards.
     * @param {BoardDeleteManyArgs} args - Arguments to filter Boards to delete.
     * @example
     * // Delete a few Boards
     * const { count } = await prisma.board.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
    **/
    deleteMany<T extends BoardDeleteManyArgs>(
      args?: SelectSubset<T, BoardDeleteManyArgs>
    ): PrismaPromise<BatchPayload>

    /**
     * Update zero or more Boards.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BoardUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Boards
     * const board = await prisma.board.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    updateMany<T extends BoardUpdateManyArgs>(
      args: SelectSubset<T, BoardUpdateManyArgs>
    ): PrismaPromise<BatchPayload>

    /**
     * Create or update one Board.
     * @param {BoardUpsertArgs} args - Arguments to update or create a Board.
     * @example
     * // Update or create a Board
     * const board = await prisma.board.upsert({
     *   create: {
     *     // ... data to create a Board
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Board we want to update
     *   }
     * })
    **/
    upsert<T extends BoardUpsertArgs>(
      args: SelectSubset<T, BoardUpsertArgs>
    ): CheckSelect<T, Prisma__BoardClient<Board>, Prisma__BoardClient<BoardGetPayload<T>>>

    /**
     * Count the number of Boards.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BoardCountArgs} args - Arguments to filter Boards to count.
     * @example
     * // Count the number of Boards
     * const count = await prisma.board.count({
     *   where: {
     *     // ... the filter for the Boards we want to count
     *   }
     * })
    **/
    count<T extends BoardCountArgs>(
      args?: Subset<T, BoardCountArgs>,
    ): PrismaPromise<
      T extends _Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], BoardCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Board.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BoardAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends BoardAggregateArgs>(args: Subset<T, BoardAggregateArgs>): PrismaPromise<GetBoardAggregateType<T>>

    /**
     * Group by Board.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BoardGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends BoardGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: BoardGroupByArgs['orderBy'] }
        : { orderBy?: BoardGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends TupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, BoardGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetBoardGroupByPayload<T> : PrismaPromise<InputErrors>
  }

  /**
   * The delegate class that acts as a "Promise-like" for Board.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export class Prisma__BoardClient<T> implements PrismaPromise<T> {
    [prisma]: true;
    private readonly _dmmf;
    private readonly _fetcher;
    private readonly _queryType;
    private readonly _rootField;
    private readonly _clientMethod;
    private readonly _args;
    private readonly _dataPath;
    private readonly _errorFormat;
    private readonly _measurePerformance?;
    private _isList;
    private _callsite;
    private _requestPromise?;
    constructor(_dmmf: runtime.DMMFClass, _fetcher: PrismaClientFetcher, _queryType: 'query' | 'mutation', _rootField: string, _clientMethod: string, _args: any, _dataPath: string[], _errorFormat: ErrorFormat, _measurePerformance?: boolean | undefined, _isList?: boolean);
    readonly [Symbol.toStringTag]: 'PrismaClientPromise';


    private get _document();
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): Promise<TResult1 | TResult2>;
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): Promise<T | TResult>;
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): Promise<T>;
  }

  // Custom InputTypes

  /**
   * Board findUnique
   */
  export type BoardFindUniqueArgs = {
    /**
     * Select specific fields to fetch from the Board
     * 
    **/
    select?: BoardSelect | null
    /**
     * Throw an Error if a Board can't be found
     * 
    **/
    rejectOnNotFound?: RejectOnNotFound
    /**
     * Filter, which Board to fetch.
     * 
    **/
    where: BoardWhereUniqueInput
  }


  /**
   * Board findFirst
   */
  export type BoardFindFirstArgs = {
    /**
     * Select specific fields to fetch from the Board
     * 
    **/
    select?: BoardSelect | null
    /**
     * Throw an Error if a Board can't be found
     * 
    **/
    rejectOnNotFound?: RejectOnNotFound
    /**
     * Filter, which Board to fetch.
     * 
    **/
    where?: BoardWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Boards to fetch.
     * 
    **/
    orderBy?: Enumerable<BoardOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Boards.
     * 
    **/
    cursor?: BoardWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Boards from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Boards.
     * 
    **/
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Boards.
     * 
    **/
    distinct?: Enumerable<BoardScalarFieldEnum>
  }


  /**
   * Board findMany
   */
  export type BoardFindManyArgs = {
    /**
     * Select specific fields to fetch from the Board
     * 
    **/
    select?: BoardSelect | null
    /**
     * Filter, which Boards to fetch.
     * 
    **/
    where?: BoardWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Boards to fetch.
     * 
    **/
    orderBy?: Enumerable<BoardOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Boards.
     * 
    **/
    cursor?: BoardWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Boards from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Boards.
     * 
    **/
    skip?: number
    distinct?: Enumerable<BoardScalarFieldEnum>
  }


  /**
   * Board create
   */
  export type BoardCreateArgs = {
    /**
     * Select specific fields to fetch from the Board
     * 
    **/
    select?: BoardSelect | null
    /**
     * The data needed to create a Board.
     * 
    **/
    data: XOR<BoardCreateInput, BoardUncheckedCreateInput>
  }


  /**
   * Board createMany
   */
  export type BoardCreateManyArgs = {
    /**
     * The data used to create many Boards.
     * 
    **/
    data: Enumerable<BoardCreateManyInput>
    skipDuplicates?: boolean
  }


  /**
   * Board update
   */
  export type BoardUpdateArgs = {
    /**
     * Select specific fields to fetch from the Board
     * 
    **/
    select?: BoardSelect | null
    /**
     * The data needed to update a Board.
     * 
    **/
    data: XOR<BoardUpdateInput, BoardUncheckedUpdateInput>
    /**
     * Choose, which Board to update.
     * 
    **/
    where: BoardWhereUniqueInput
  }


  /**
   * Board updateMany
   */
  export type BoardUpdateManyArgs = {
    /**
     * The data used to update Boards.
     * 
    **/
    data: XOR<BoardUpdateManyMutationInput, BoardUncheckedUpdateManyInput>
    /**
     * Filter which Boards to update
     * 
    **/
    where?: BoardWhereInput
  }


  /**
   * Board upsert
   */
  export type BoardUpsertArgs = {
    /**
     * Select specific fields to fetch from the Board
     * 
    **/
    select?: BoardSelect | null
    /**
     * The filter to search for the Board to update in case it exists.
     * 
    **/
    where: BoardWhereUniqueInput
    /**
     * In case the Board found by the `where` argument doesn't exist, create a new Board with this data.
     * 
    **/
    create: XOR<BoardCreateInput, BoardUncheckedCreateInput>
    /**
     * In case the Board was found with the provided `where` argument, update it with this data.
     * 
    **/
    update: XOR<BoardUpdateInput, BoardUncheckedUpdateInput>
  }


  /**
   * Board delete
   */
  export type BoardDeleteArgs = {
    /**
     * Select specific fields to fetch from the Board
     * 
    **/
    select?: BoardSelect | null
    /**
     * Filter which Board to delete.
     * 
    **/
    where: BoardWhereUniqueInput
  }


  /**
   * Board deleteMany
   */
  export type BoardDeleteManyArgs = {
    /**
     * Filter which Boards to delete
     * 
    **/
    where?: BoardWhereInput
  }


  /**
   * Board without action
   */
  export type BoardArgs = {
    /**
     * Select specific fields to fetch from the Board
     * 
    **/
    select?: BoardSelect | null
  }



  /**
   * Model Service
   */


  export type AggregateService = {
    _count: ServiceCountAggregateOutputType | null
    _min: ServiceMinAggregateOutputType | null
    _max: ServiceMaxAggregateOutputType | null
  }

  export type ServiceMinAggregateOutputType = {
    id: string | null
    createdAt: Date | null
    updatedAt: Date | null
    type: string | null
    name: string | null
  }

  export type ServiceMaxAggregateOutputType = {
    id: string | null
    createdAt: Date | null
    updatedAt: Date | null
    type: string | null
    name: string | null
  }

  export type ServiceCountAggregateOutputType = {
    id: number
    createdAt: number
    updatedAt: number
    type: number
    config: number
    name: number
    _all: number
  }


  export type ServiceMinAggregateInputType = {
    id?: true
    createdAt?: true
    updatedAt?: true
    type?: true
    name?: true
  }

  export type ServiceMaxAggregateInputType = {
    id?: true
    createdAt?: true
    updatedAt?: true
    type?: true
    name?: true
  }

  export type ServiceCountAggregateInputType = {
    id?: true
    createdAt?: true
    updatedAt?: true
    type?: true
    config?: true
    name?: true
    _all?: true
  }

  export type ServiceAggregateArgs = {
    /**
     * Filter which Service to aggregate.
     * 
    **/
    where?: ServiceWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Services to fetch.
     * 
    **/
    orderBy?: Enumerable<ServiceOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     * 
    **/
    cursor?: ServiceWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Services from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Services.
     * 
    **/
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Services
    **/
    _count?: true | ServiceCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ServiceMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ServiceMaxAggregateInputType
  }

  export type GetServiceAggregateType<T extends ServiceAggregateArgs> = {
        [P in keyof T & keyof AggregateService]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateService[P]>
      : GetScalarType<T[P], AggregateService[P]>
  }




  export type ServiceGroupByArgs = {
    where?: ServiceWhereInput
    orderBy?: Enumerable<ServiceOrderByWithAggregationInput>
    by: Array<ServiceScalarFieldEnum>
    having?: ServiceScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ServiceCountAggregateInputType | true
    _min?: ServiceMinAggregateInputType
    _max?: ServiceMaxAggregateInputType
  }


  export type ServiceGroupByOutputType = {
    id: string
    createdAt: Date
    updatedAt: Date
    type: string
    config: JsonValue | null
    name: string | null
    _count: ServiceCountAggregateOutputType | null
    _min: ServiceMinAggregateOutputType | null
    _max: ServiceMaxAggregateOutputType | null
  }

  type GetServiceGroupByPayload<T extends ServiceGroupByArgs> = PrismaPromise<
    Array<
      PickArray<ServiceGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ServiceGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ServiceGroupByOutputType[P]>
            : GetScalarType<T[P], ServiceGroupByOutputType[P]>
        }
      >
    >


  export type ServiceSelect = {
    id?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    type?: boolean
    config?: boolean
    name?: boolean
    Transformer?: boolean | TransformerFindManyArgs
    UserSegmentByID?: boolean | UserSegmentFindManyArgs
    UserSegmentByPhone?: boolean | UserSegmentFindManyArgs
    UserSegmentAll?: boolean | UserSegmentFindManyArgs
    _count?: boolean | ServiceCountOutputTypeArgs
  }

  export type ServiceInclude = {
    Transformer?: boolean | TransformerFindManyArgs
    UserSegmentByID?: boolean | UserSegmentFindManyArgs
    UserSegmentByPhone?: boolean | UserSegmentFindManyArgs
    UserSegmentAll?: boolean | UserSegmentFindManyArgs
    _count?: boolean | ServiceCountOutputTypeArgs
  }

  export type ServiceGetPayload<
    S extends boolean | null | undefined | ServiceArgs,
    U = keyof S
      > = S extends true
        ? Service
    : S extends undefined
    ? never
    : S extends ServiceArgs | ServiceFindManyArgs
    ?'include' extends U
    ? Service  & {
    [P in TrueKeys<S['include']>]:
        P extends 'Transformer' ? Array < TransformerGetPayload<S['include'][P]>>  :
        P extends 'UserSegmentByID' ? Array < UserSegmentGetPayload<S['include'][P]>>  :
        P extends 'UserSegmentByPhone' ? Array < UserSegmentGetPayload<S['include'][P]>>  :
        P extends 'UserSegmentAll' ? Array < UserSegmentGetPayload<S['include'][P]>>  :
        P extends '_count' ? ServiceCountOutputTypeGetPayload<S['include'][P]> :  never
  } 
    : 'select' extends U
    ? {
    [P in TrueKeys<S['select']>]:
        P extends 'Transformer' ? Array < TransformerGetPayload<S['select'][P]>>  :
        P extends 'UserSegmentByID' ? Array < UserSegmentGetPayload<S['select'][P]>>  :
        P extends 'UserSegmentByPhone' ? Array < UserSegmentGetPayload<S['select'][P]>>  :
        P extends 'UserSegmentAll' ? Array < UserSegmentGetPayload<S['select'][P]>>  :
        P extends '_count' ? ServiceCountOutputTypeGetPayload<S['select'][P]> :  P extends keyof Service ? Service[P] : never
  } 
    : Service
  : Service


  type ServiceCountArgs = Merge<
    Omit<ServiceFindManyArgs, 'select' | 'include'> & {
      select?: ServiceCountAggregateInputType | true
    }
  >

  export interface ServiceDelegate<GlobalRejectSettings> {
    /**
     * Find zero or one Service that matches the filter.
     * @param {ServiceFindUniqueArgs} args - Arguments to find a Service
     * @example
     * // Get one Service
     * const service = await prisma.service.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUnique<T extends ServiceFindUniqueArgs,  LocalRejectSettings = T["rejectOnNotFound"] extends RejectOnNotFound ? T['rejectOnNotFound'] : undefined>(
      args: SelectSubset<T, ServiceFindUniqueArgs>
    ): HasReject<GlobalRejectSettings, LocalRejectSettings, 'findUnique', 'Service'> extends True ? CheckSelect<T, Prisma__ServiceClient<Service>, Prisma__ServiceClient<ServiceGetPayload<T>>> : CheckSelect<T, Prisma__ServiceClient<Service | null >, Prisma__ServiceClient<ServiceGetPayload<T> | null >>

    /**
     * Find the first Service that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ServiceFindFirstArgs} args - Arguments to find a Service
     * @example
     * // Get one Service
     * const service = await prisma.service.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirst<T extends ServiceFindFirstArgs,  LocalRejectSettings = T["rejectOnNotFound"] extends RejectOnNotFound ? T['rejectOnNotFound'] : undefined>(
      args?: SelectSubset<T, ServiceFindFirstArgs>
    ): HasReject<GlobalRejectSettings, LocalRejectSettings, 'findFirst', 'Service'> extends True ? CheckSelect<T, Prisma__ServiceClient<Service>, Prisma__ServiceClient<ServiceGetPayload<T>>> : CheckSelect<T, Prisma__ServiceClient<Service | null >, Prisma__ServiceClient<ServiceGetPayload<T> | null >>

    /**
     * Find zero or more Services that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ServiceFindManyArgs=} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Services
     * const services = await prisma.service.findMany()
     * 
     * // Get first 10 Services
     * const services = await prisma.service.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const serviceWithIdOnly = await prisma.service.findMany({ select: { id: true } })
     * 
    **/
    findMany<T extends ServiceFindManyArgs>(
      args?: SelectSubset<T, ServiceFindManyArgs>
    ): CheckSelect<T, PrismaPromise<Array<Service>>, PrismaPromise<Array<ServiceGetPayload<T>>>>

    /**
     * Create a Service.
     * @param {ServiceCreateArgs} args - Arguments to create a Service.
     * @example
     * // Create one Service
     * const Service = await prisma.service.create({
     *   data: {
     *     // ... data to create a Service
     *   }
     * })
     * 
    **/
    create<T extends ServiceCreateArgs>(
      args: SelectSubset<T, ServiceCreateArgs>
    ): CheckSelect<T, Prisma__ServiceClient<Service>, Prisma__ServiceClient<ServiceGetPayload<T>>>

    /**
     * Create many Services.
     *     @param {ServiceCreateManyArgs} args - Arguments to create many Services.
     *     @example
     *     // Create many Services
     *     const service = await prisma.service.createMany({
     *       data: {
     *         // ... provide data here
     *       }
     *     })
     *     
    **/
    createMany<T extends ServiceCreateManyArgs>(
      args?: SelectSubset<T, ServiceCreateManyArgs>
    ): PrismaPromise<BatchPayload>

    /**
     * Delete a Service.
     * @param {ServiceDeleteArgs} args - Arguments to delete one Service.
     * @example
     * // Delete one Service
     * const Service = await prisma.service.delete({
     *   where: {
     *     // ... filter to delete one Service
     *   }
     * })
     * 
    **/
    delete<T extends ServiceDeleteArgs>(
      args: SelectSubset<T, ServiceDeleteArgs>
    ): CheckSelect<T, Prisma__ServiceClient<Service>, Prisma__ServiceClient<ServiceGetPayload<T>>>

    /**
     * Update one Service.
     * @param {ServiceUpdateArgs} args - Arguments to update one Service.
     * @example
     * // Update one Service
     * const service = await prisma.service.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    update<T extends ServiceUpdateArgs>(
      args: SelectSubset<T, ServiceUpdateArgs>
    ): CheckSelect<T, Prisma__ServiceClient<Service>, Prisma__ServiceClient<ServiceGetPayload<T>>>

    /**
     * Delete zero or more Services.
     * @param {ServiceDeleteManyArgs} args - Arguments to filter Services to delete.
     * @example
     * // Delete a few Services
     * const { count } = await prisma.service.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
    **/
    deleteMany<T extends ServiceDeleteManyArgs>(
      args?: SelectSubset<T, ServiceDeleteManyArgs>
    ): PrismaPromise<BatchPayload>

    /**
     * Update zero or more Services.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ServiceUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Services
     * const service = await prisma.service.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    updateMany<T extends ServiceUpdateManyArgs>(
      args: SelectSubset<T, ServiceUpdateManyArgs>
    ): PrismaPromise<BatchPayload>

    /**
     * Create or update one Service.
     * @param {ServiceUpsertArgs} args - Arguments to update or create a Service.
     * @example
     * // Update or create a Service
     * const service = await prisma.service.upsert({
     *   create: {
     *     // ... data to create a Service
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Service we want to update
     *   }
     * })
    **/
    upsert<T extends ServiceUpsertArgs>(
      args: SelectSubset<T, ServiceUpsertArgs>
    ): CheckSelect<T, Prisma__ServiceClient<Service>, Prisma__ServiceClient<ServiceGetPayload<T>>>

    /**
     * Count the number of Services.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ServiceCountArgs} args - Arguments to filter Services to count.
     * @example
     * // Count the number of Services
     * const count = await prisma.service.count({
     *   where: {
     *     // ... the filter for the Services we want to count
     *   }
     * })
    **/
    count<T extends ServiceCountArgs>(
      args?: Subset<T, ServiceCountArgs>,
    ): PrismaPromise<
      T extends _Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ServiceCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Service.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ServiceAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends ServiceAggregateArgs>(args: Subset<T, ServiceAggregateArgs>): PrismaPromise<GetServiceAggregateType<T>>

    /**
     * Group by Service.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ServiceGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends ServiceGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ServiceGroupByArgs['orderBy'] }
        : { orderBy?: ServiceGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends TupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, ServiceGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetServiceGroupByPayload<T> : PrismaPromise<InputErrors>
  }

  /**
   * The delegate class that acts as a "Promise-like" for Service.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export class Prisma__ServiceClient<T> implements PrismaPromise<T> {
    [prisma]: true;
    private readonly _dmmf;
    private readonly _fetcher;
    private readonly _queryType;
    private readonly _rootField;
    private readonly _clientMethod;
    private readonly _args;
    private readonly _dataPath;
    private readonly _errorFormat;
    private readonly _measurePerformance?;
    private _isList;
    private _callsite;
    private _requestPromise?;
    constructor(_dmmf: runtime.DMMFClass, _fetcher: PrismaClientFetcher, _queryType: 'query' | 'mutation', _rootField: string, _clientMethod: string, _args: any, _dataPath: string[], _errorFormat: ErrorFormat, _measurePerformance?: boolean | undefined, _isList?: boolean);
    readonly [Symbol.toStringTag]: 'PrismaClientPromise';

    Transformer<T extends TransformerFindManyArgs = {}>(args?: Subset<T, TransformerFindManyArgs>): CheckSelect<T, PrismaPromise<Array<Transformer>>, PrismaPromise<Array<TransformerGetPayload<T>>>>;

    UserSegmentByID<T extends UserSegmentFindManyArgs = {}>(args?: Subset<T, UserSegmentFindManyArgs>): CheckSelect<T, PrismaPromise<Array<UserSegment>>, PrismaPromise<Array<UserSegmentGetPayload<T>>>>;

    UserSegmentByPhone<T extends UserSegmentFindManyArgs = {}>(args?: Subset<T, UserSegmentFindManyArgs>): CheckSelect<T, PrismaPromise<Array<UserSegment>>, PrismaPromise<Array<UserSegmentGetPayload<T>>>>;

    UserSegmentAll<T extends UserSegmentFindManyArgs = {}>(args?: Subset<T, UserSegmentFindManyArgs>): CheckSelect<T, PrismaPromise<Array<UserSegment>>, PrismaPromise<Array<UserSegmentGetPayload<T>>>>;

    private get _document();
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): Promise<TResult1 | TResult2>;
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): Promise<T | TResult>;
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): Promise<T>;
  }

  // Custom InputTypes

  /**
   * Service findUnique
   */
  export type ServiceFindUniqueArgs = {
    /**
     * Select specific fields to fetch from the Service
     * 
    **/
    select?: ServiceSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: ServiceInclude | null
    /**
     * Throw an Error if a Service can't be found
     * 
    **/
    rejectOnNotFound?: RejectOnNotFound
    /**
     * Filter, which Service to fetch.
     * 
    **/
    where: ServiceWhereUniqueInput
  }


  /**
   * Service findFirst
   */
  export type ServiceFindFirstArgs = {
    /**
     * Select specific fields to fetch from the Service
     * 
    **/
    select?: ServiceSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: ServiceInclude | null
    /**
     * Throw an Error if a Service can't be found
     * 
    **/
    rejectOnNotFound?: RejectOnNotFound
    /**
     * Filter, which Service to fetch.
     * 
    **/
    where?: ServiceWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Services to fetch.
     * 
    **/
    orderBy?: Enumerable<ServiceOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Services.
     * 
    **/
    cursor?: ServiceWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Services from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Services.
     * 
    **/
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Services.
     * 
    **/
    distinct?: Enumerable<ServiceScalarFieldEnum>
  }


  /**
   * Service findMany
   */
  export type ServiceFindManyArgs = {
    /**
     * Select specific fields to fetch from the Service
     * 
    **/
    select?: ServiceSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: ServiceInclude | null
    /**
     * Filter, which Services to fetch.
     * 
    **/
    where?: ServiceWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Services to fetch.
     * 
    **/
    orderBy?: Enumerable<ServiceOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Services.
     * 
    **/
    cursor?: ServiceWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Services from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Services.
     * 
    **/
    skip?: number
    distinct?: Enumerable<ServiceScalarFieldEnum>
  }


  /**
   * Service create
   */
  export type ServiceCreateArgs = {
    /**
     * Select specific fields to fetch from the Service
     * 
    **/
    select?: ServiceSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: ServiceInclude | null
    /**
     * The data needed to create a Service.
     * 
    **/
    data: XOR<ServiceCreateInput, ServiceUncheckedCreateInput>
  }


  /**
   * Service createMany
   */
  export type ServiceCreateManyArgs = {
    /**
     * The data used to create many Services.
     * 
    **/
    data: Enumerable<ServiceCreateManyInput>
    skipDuplicates?: boolean
  }


  /**
   * Service update
   */
  export type ServiceUpdateArgs = {
    /**
     * Select specific fields to fetch from the Service
     * 
    **/
    select?: ServiceSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: ServiceInclude | null
    /**
     * The data needed to update a Service.
     * 
    **/
    data: XOR<ServiceUpdateInput, ServiceUncheckedUpdateInput>
    /**
     * Choose, which Service to update.
     * 
    **/
    where: ServiceWhereUniqueInput
  }


  /**
   * Service updateMany
   */
  export type ServiceUpdateManyArgs = {
    /**
     * The data used to update Services.
     * 
    **/
    data: XOR<ServiceUpdateManyMutationInput, ServiceUncheckedUpdateManyInput>
    /**
     * Filter which Services to update
     * 
    **/
    where?: ServiceWhereInput
  }


  /**
   * Service upsert
   */
  export type ServiceUpsertArgs = {
    /**
     * Select specific fields to fetch from the Service
     * 
    **/
    select?: ServiceSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: ServiceInclude | null
    /**
     * The filter to search for the Service to update in case it exists.
     * 
    **/
    where: ServiceWhereUniqueInput
    /**
     * In case the Service found by the `where` argument doesn't exist, create a new Service with this data.
     * 
    **/
    create: XOR<ServiceCreateInput, ServiceUncheckedCreateInput>
    /**
     * In case the Service was found with the provided `where` argument, update it with this data.
     * 
    **/
    update: XOR<ServiceUpdateInput, ServiceUncheckedUpdateInput>
  }


  /**
   * Service delete
   */
  export type ServiceDeleteArgs = {
    /**
     * Select specific fields to fetch from the Service
     * 
    **/
    select?: ServiceSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: ServiceInclude | null
    /**
     * Filter which Service to delete.
     * 
    **/
    where: ServiceWhereUniqueInput
  }


  /**
   * Service deleteMany
   */
  export type ServiceDeleteManyArgs = {
    /**
     * Filter which Services to delete
     * 
    **/
    where?: ServiceWhereInput
  }


  /**
   * Service without action
   */
  export type ServiceArgs = {
    /**
     * Select specific fields to fetch from the Service
     * 
    **/
    select?: ServiceSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: ServiceInclude | null
  }



  /**
   * Model Transformer
   */


  export type AggregateTransformer = {
    _count: TransformerCountAggregateOutputType | null
    _min: TransformerMinAggregateOutputType | null
    _max: TransformerMaxAggregateOutputType | null
  }

  export type TransformerMinAggregateOutputType = {
    id: string | null
    createdAt: Date | null
    updatedAt: Date | null
    name: string | null
    serviceId: string | null
  }

  export type TransformerMaxAggregateOutputType = {
    id: string | null
    createdAt: Date | null
    updatedAt: Date | null
    name: string | null
    serviceId: string | null
  }

  export type TransformerCountAggregateOutputType = {
    id: number
    createdAt: number
    updatedAt: number
    name: number
    tags: number
    config: number
    serviceId: number
    _all: number
  }


  export type TransformerMinAggregateInputType = {
    id?: true
    createdAt?: true
    updatedAt?: true
    name?: true
    serviceId?: true
  }

  export type TransformerMaxAggregateInputType = {
    id?: true
    createdAt?: true
    updatedAt?: true
    name?: true
    serviceId?: true
  }

  export type TransformerCountAggregateInputType = {
    id?: true
    createdAt?: true
    updatedAt?: true
    name?: true
    tags?: true
    config?: true
    serviceId?: true
    _all?: true
  }

  export type TransformerAggregateArgs = {
    /**
     * Filter which Transformer to aggregate.
     * 
    **/
    where?: TransformerWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Transformers to fetch.
     * 
    **/
    orderBy?: Enumerable<TransformerOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     * 
    **/
    cursor?: TransformerWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Transformers from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Transformers.
     * 
    **/
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Transformers
    **/
    _count?: true | TransformerCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: TransformerMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: TransformerMaxAggregateInputType
  }

  export type GetTransformerAggregateType<T extends TransformerAggregateArgs> = {
        [P in keyof T & keyof AggregateTransformer]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateTransformer[P]>
      : GetScalarType<T[P], AggregateTransformer[P]>
  }




  export type TransformerGroupByArgs = {
    where?: TransformerWhereInput
    orderBy?: Enumerable<TransformerOrderByWithAggregationInput>
    by: Array<TransformerScalarFieldEnum>
    having?: TransformerScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: TransformerCountAggregateInputType | true
    _min?: TransformerMinAggregateInputType
    _max?: TransformerMaxAggregateInputType
  }


  export type TransformerGroupByOutputType = {
    id: string
    createdAt: Date
    updatedAt: Date
    name: string
    tags: string[]
    config: JsonValue
    serviceId: string
    _count: TransformerCountAggregateOutputType | null
    _min: TransformerMinAggregateOutputType | null
    _max: TransformerMaxAggregateOutputType | null
  }

  type GetTransformerGroupByPayload<T extends TransformerGroupByArgs> = PrismaPromise<
    Array<
      PickArray<TransformerGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof TransformerGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], TransformerGroupByOutputType[P]>
            : GetScalarType<T[P], TransformerGroupByOutputType[P]>
        }
      >
    >


  export type TransformerSelect = {
    id?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    name?: boolean
    tags?: boolean
    config?: boolean
    service?: boolean | ServiceArgs
    serviceId?: boolean
    TranformerConfig?: boolean | TransformerConfigFindManyArgs
    _count?: boolean | TransformerCountOutputTypeArgs
  }

  export type TransformerInclude = {
    service?: boolean | ServiceArgs
    TranformerConfig?: boolean | TransformerConfigFindManyArgs
    _count?: boolean | TransformerCountOutputTypeArgs
  }

  export type TransformerGetPayload<
    S extends boolean | null | undefined | TransformerArgs,
    U = keyof S
      > = S extends true
        ? Transformer
    : S extends undefined
    ? never
    : S extends TransformerArgs | TransformerFindManyArgs
    ?'include' extends U
    ? Transformer  & {
    [P in TrueKeys<S['include']>]:
        P extends 'service' ? ServiceGetPayload<S['include'][P]> :
        P extends 'TranformerConfig' ? Array < TransformerConfigGetPayload<S['include'][P]>>  :
        P extends '_count' ? TransformerCountOutputTypeGetPayload<S['include'][P]> :  never
  } 
    : 'select' extends U
    ? {
    [P in TrueKeys<S['select']>]:
        P extends 'service' ? ServiceGetPayload<S['select'][P]> :
        P extends 'TranformerConfig' ? Array < TransformerConfigGetPayload<S['select'][P]>>  :
        P extends '_count' ? TransformerCountOutputTypeGetPayload<S['select'][P]> :  P extends keyof Transformer ? Transformer[P] : never
  } 
    : Transformer
  : Transformer


  type TransformerCountArgs = Merge<
    Omit<TransformerFindManyArgs, 'select' | 'include'> & {
      select?: TransformerCountAggregateInputType | true
    }
  >

  export interface TransformerDelegate<GlobalRejectSettings> {
    /**
     * Find zero or one Transformer that matches the filter.
     * @param {TransformerFindUniqueArgs} args - Arguments to find a Transformer
     * @example
     * // Get one Transformer
     * const transformer = await prisma.transformer.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUnique<T extends TransformerFindUniqueArgs,  LocalRejectSettings = T["rejectOnNotFound"] extends RejectOnNotFound ? T['rejectOnNotFound'] : undefined>(
      args: SelectSubset<T, TransformerFindUniqueArgs>
    ): HasReject<GlobalRejectSettings, LocalRejectSettings, 'findUnique', 'Transformer'> extends True ? CheckSelect<T, Prisma__TransformerClient<Transformer>, Prisma__TransformerClient<TransformerGetPayload<T>>> : CheckSelect<T, Prisma__TransformerClient<Transformer | null >, Prisma__TransformerClient<TransformerGetPayload<T> | null >>

    /**
     * Find the first Transformer that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TransformerFindFirstArgs} args - Arguments to find a Transformer
     * @example
     * // Get one Transformer
     * const transformer = await prisma.transformer.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirst<T extends TransformerFindFirstArgs,  LocalRejectSettings = T["rejectOnNotFound"] extends RejectOnNotFound ? T['rejectOnNotFound'] : undefined>(
      args?: SelectSubset<T, TransformerFindFirstArgs>
    ): HasReject<GlobalRejectSettings, LocalRejectSettings, 'findFirst', 'Transformer'> extends True ? CheckSelect<T, Prisma__TransformerClient<Transformer>, Prisma__TransformerClient<TransformerGetPayload<T>>> : CheckSelect<T, Prisma__TransformerClient<Transformer | null >, Prisma__TransformerClient<TransformerGetPayload<T> | null >>

    /**
     * Find zero or more Transformers that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TransformerFindManyArgs=} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Transformers
     * const transformers = await prisma.transformer.findMany()
     * 
     * // Get first 10 Transformers
     * const transformers = await prisma.transformer.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const transformerWithIdOnly = await prisma.transformer.findMany({ select: { id: true } })
     * 
    **/
    findMany<T extends TransformerFindManyArgs>(
      args?: SelectSubset<T, TransformerFindManyArgs>
    ): CheckSelect<T, PrismaPromise<Array<Transformer>>, PrismaPromise<Array<TransformerGetPayload<T>>>>

    /**
     * Create a Transformer.
     * @param {TransformerCreateArgs} args - Arguments to create a Transformer.
     * @example
     * // Create one Transformer
     * const Transformer = await prisma.transformer.create({
     *   data: {
     *     // ... data to create a Transformer
     *   }
     * })
     * 
    **/
    create<T extends TransformerCreateArgs>(
      args: SelectSubset<T, TransformerCreateArgs>
    ): CheckSelect<T, Prisma__TransformerClient<Transformer>, Prisma__TransformerClient<TransformerGetPayload<T>>>

    /**
     * Create many Transformers.
     *     @param {TransformerCreateManyArgs} args - Arguments to create many Transformers.
     *     @example
     *     // Create many Transformers
     *     const transformer = await prisma.transformer.createMany({
     *       data: {
     *         // ... provide data here
     *       }
     *     })
     *     
    **/
    createMany<T extends TransformerCreateManyArgs>(
      args?: SelectSubset<T, TransformerCreateManyArgs>
    ): PrismaPromise<BatchPayload>

    /**
     * Delete a Transformer.
     * @param {TransformerDeleteArgs} args - Arguments to delete one Transformer.
     * @example
     * // Delete one Transformer
     * const Transformer = await prisma.transformer.delete({
     *   where: {
     *     // ... filter to delete one Transformer
     *   }
     * })
     * 
    **/
    delete<T extends TransformerDeleteArgs>(
      args: SelectSubset<T, TransformerDeleteArgs>
    ): CheckSelect<T, Prisma__TransformerClient<Transformer>, Prisma__TransformerClient<TransformerGetPayload<T>>>

    /**
     * Update one Transformer.
     * @param {TransformerUpdateArgs} args - Arguments to update one Transformer.
     * @example
     * // Update one Transformer
     * const transformer = await prisma.transformer.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    update<T extends TransformerUpdateArgs>(
      args: SelectSubset<T, TransformerUpdateArgs>
    ): CheckSelect<T, Prisma__TransformerClient<Transformer>, Prisma__TransformerClient<TransformerGetPayload<T>>>

    /**
     * Delete zero or more Transformers.
     * @param {TransformerDeleteManyArgs} args - Arguments to filter Transformers to delete.
     * @example
     * // Delete a few Transformers
     * const { count } = await prisma.transformer.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
    **/
    deleteMany<T extends TransformerDeleteManyArgs>(
      args?: SelectSubset<T, TransformerDeleteManyArgs>
    ): PrismaPromise<BatchPayload>

    /**
     * Update zero or more Transformers.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TransformerUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Transformers
     * const transformer = await prisma.transformer.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    updateMany<T extends TransformerUpdateManyArgs>(
      args: SelectSubset<T, TransformerUpdateManyArgs>
    ): PrismaPromise<BatchPayload>

    /**
     * Create or update one Transformer.
     * @param {TransformerUpsertArgs} args - Arguments to update or create a Transformer.
     * @example
     * // Update or create a Transformer
     * const transformer = await prisma.transformer.upsert({
     *   create: {
     *     // ... data to create a Transformer
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Transformer we want to update
     *   }
     * })
    **/
    upsert<T extends TransformerUpsertArgs>(
      args: SelectSubset<T, TransformerUpsertArgs>
    ): CheckSelect<T, Prisma__TransformerClient<Transformer>, Prisma__TransformerClient<TransformerGetPayload<T>>>

    /**
     * Count the number of Transformers.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TransformerCountArgs} args - Arguments to filter Transformers to count.
     * @example
     * // Count the number of Transformers
     * const count = await prisma.transformer.count({
     *   where: {
     *     // ... the filter for the Transformers we want to count
     *   }
     * })
    **/
    count<T extends TransformerCountArgs>(
      args?: Subset<T, TransformerCountArgs>,
    ): PrismaPromise<
      T extends _Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], TransformerCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Transformer.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TransformerAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends TransformerAggregateArgs>(args: Subset<T, TransformerAggregateArgs>): PrismaPromise<GetTransformerAggregateType<T>>

    /**
     * Group by Transformer.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TransformerGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends TransformerGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: TransformerGroupByArgs['orderBy'] }
        : { orderBy?: TransformerGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends TupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, TransformerGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetTransformerGroupByPayload<T> : PrismaPromise<InputErrors>
  }

  /**
   * The delegate class that acts as a "Promise-like" for Transformer.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export class Prisma__TransformerClient<T> implements PrismaPromise<T> {
    [prisma]: true;
    private readonly _dmmf;
    private readonly _fetcher;
    private readonly _queryType;
    private readonly _rootField;
    private readonly _clientMethod;
    private readonly _args;
    private readonly _dataPath;
    private readonly _errorFormat;
    private readonly _measurePerformance?;
    private _isList;
    private _callsite;
    private _requestPromise?;
    constructor(_dmmf: runtime.DMMFClass, _fetcher: PrismaClientFetcher, _queryType: 'query' | 'mutation', _rootField: string, _clientMethod: string, _args: any, _dataPath: string[], _errorFormat: ErrorFormat, _measurePerformance?: boolean | undefined, _isList?: boolean);
    readonly [Symbol.toStringTag]: 'PrismaClientPromise';

    service<T extends ServiceArgs = {}>(args?: Subset<T, ServiceArgs>): CheckSelect<T, Prisma__ServiceClient<Service | null >, Prisma__ServiceClient<ServiceGetPayload<T> | null >>;

    TranformerConfig<T extends TransformerConfigFindManyArgs = {}>(args?: Subset<T, TransformerConfigFindManyArgs>): CheckSelect<T, PrismaPromise<Array<TransformerConfig>>, PrismaPromise<Array<TransformerConfigGetPayload<T>>>>;

    private get _document();
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): Promise<TResult1 | TResult2>;
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): Promise<T | TResult>;
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): Promise<T>;
  }

  // Custom InputTypes

  /**
   * Transformer findUnique
   */
  export type TransformerFindUniqueArgs = {
    /**
     * Select specific fields to fetch from the Transformer
     * 
    **/
    select?: TransformerSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: TransformerInclude | null
    /**
     * Throw an Error if a Transformer can't be found
     * 
    **/
    rejectOnNotFound?: RejectOnNotFound
    /**
     * Filter, which Transformer to fetch.
     * 
    **/
    where: TransformerWhereUniqueInput
  }


  /**
   * Transformer findFirst
   */
  export type TransformerFindFirstArgs = {
    /**
     * Select specific fields to fetch from the Transformer
     * 
    **/
    select?: TransformerSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: TransformerInclude | null
    /**
     * Throw an Error if a Transformer can't be found
     * 
    **/
    rejectOnNotFound?: RejectOnNotFound
    /**
     * Filter, which Transformer to fetch.
     * 
    **/
    where?: TransformerWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Transformers to fetch.
     * 
    **/
    orderBy?: Enumerable<TransformerOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Transformers.
     * 
    **/
    cursor?: TransformerWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Transformers from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Transformers.
     * 
    **/
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Transformers.
     * 
    **/
    distinct?: Enumerable<TransformerScalarFieldEnum>
  }


  /**
   * Transformer findMany
   */
  export type TransformerFindManyArgs = {
    /**
     * Select specific fields to fetch from the Transformer
     * 
    **/
    select?: TransformerSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: TransformerInclude | null
    /**
     * Filter, which Transformers to fetch.
     * 
    **/
    where?: TransformerWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Transformers to fetch.
     * 
    **/
    orderBy?: Enumerable<TransformerOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Transformers.
     * 
    **/
    cursor?: TransformerWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Transformers from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Transformers.
     * 
    **/
    skip?: number
    distinct?: Enumerable<TransformerScalarFieldEnum>
  }


  /**
   * Transformer create
   */
  export type TransformerCreateArgs = {
    /**
     * Select specific fields to fetch from the Transformer
     * 
    **/
    select?: TransformerSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: TransformerInclude | null
    /**
     * The data needed to create a Transformer.
     * 
    **/
    data: XOR<TransformerCreateInput, TransformerUncheckedCreateInput>
  }


  /**
   * Transformer createMany
   */
  export type TransformerCreateManyArgs = {
    /**
     * The data used to create many Transformers.
     * 
    **/
    data: Enumerable<TransformerCreateManyInput>
    skipDuplicates?: boolean
  }


  /**
   * Transformer update
   */
  export type TransformerUpdateArgs = {
    /**
     * Select specific fields to fetch from the Transformer
     * 
    **/
    select?: TransformerSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: TransformerInclude | null
    /**
     * The data needed to update a Transformer.
     * 
    **/
    data: XOR<TransformerUpdateInput, TransformerUncheckedUpdateInput>
    /**
     * Choose, which Transformer to update.
     * 
    **/
    where: TransformerWhereUniqueInput
  }


  /**
   * Transformer updateMany
   */
  export type TransformerUpdateManyArgs = {
    /**
     * The data used to update Transformers.
     * 
    **/
    data: XOR<TransformerUpdateManyMutationInput, TransformerUncheckedUpdateManyInput>
    /**
     * Filter which Transformers to update
     * 
    **/
    where?: TransformerWhereInput
  }


  /**
   * Transformer upsert
   */
  export type TransformerUpsertArgs = {
    /**
     * Select specific fields to fetch from the Transformer
     * 
    **/
    select?: TransformerSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: TransformerInclude | null
    /**
     * The filter to search for the Transformer to update in case it exists.
     * 
    **/
    where: TransformerWhereUniqueInput
    /**
     * In case the Transformer found by the `where` argument doesn't exist, create a new Transformer with this data.
     * 
    **/
    create: XOR<TransformerCreateInput, TransformerUncheckedCreateInput>
    /**
     * In case the Transformer was found with the provided `where` argument, update it with this data.
     * 
    **/
    update: XOR<TransformerUpdateInput, TransformerUncheckedUpdateInput>
  }


  /**
   * Transformer delete
   */
  export type TransformerDeleteArgs = {
    /**
     * Select specific fields to fetch from the Transformer
     * 
    **/
    select?: TransformerSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: TransformerInclude | null
    /**
     * Filter which Transformer to delete.
     * 
    **/
    where: TransformerWhereUniqueInput
  }


  /**
   * Transformer deleteMany
   */
  export type TransformerDeleteManyArgs = {
    /**
     * Filter which Transformers to delete
     * 
    **/
    where?: TransformerWhereInput
  }


  /**
   * Transformer without action
   */
  export type TransformerArgs = {
    /**
     * Select specific fields to fetch from the Transformer
     * 
    **/
    select?: TransformerSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: TransformerInclude | null
  }



  /**
   * Model TransformerConfig
   */


  export type AggregateTransformerConfig = {
    _count: TransformerConfigCountAggregateOutputType | null
    _min: TransformerConfigMinAggregateOutputType | null
    _max: TransformerConfigMaxAggregateOutputType | null
  }

  export type TransformerConfigMinAggregateOutputType = {
    id: string | null
    createdAt: Date | null
    updatedAt: Date | null
    transformerId: string | null
    conversationLogicId: string | null
  }

  export type TransformerConfigMaxAggregateOutputType = {
    id: string | null
    createdAt: Date | null
    updatedAt: Date | null
    transformerId: string | null
    conversationLogicId: string | null
  }

  export type TransformerConfigCountAggregateOutputType = {
    id: number
    createdAt: number
    updatedAt: number
    meta: number
    transformerId: number
    conversationLogicId: number
    _all: number
  }


  export type TransformerConfigMinAggregateInputType = {
    id?: true
    createdAt?: true
    updatedAt?: true
    transformerId?: true
    conversationLogicId?: true
  }

  export type TransformerConfigMaxAggregateInputType = {
    id?: true
    createdAt?: true
    updatedAt?: true
    transformerId?: true
    conversationLogicId?: true
  }

  export type TransformerConfigCountAggregateInputType = {
    id?: true
    createdAt?: true
    updatedAt?: true
    meta?: true
    transformerId?: true
    conversationLogicId?: true
    _all?: true
  }

  export type TransformerConfigAggregateArgs = {
    /**
     * Filter which TransformerConfig to aggregate.
     * 
    **/
    where?: TransformerConfigWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of TransformerConfigs to fetch.
     * 
    **/
    orderBy?: Enumerable<TransformerConfigOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     * 
    **/
    cursor?: TransformerConfigWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` TransformerConfigs from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` TransformerConfigs.
     * 
    **/
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned TransformerConfigs
    **/
    _count?: true | TransformerConfigCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: TransformerConfigMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: TransformerConfigMaxAggregateInputType
  }

  export type GetTransformerConfigAggregateType<T extends TransformerConfigAggregateArgs> = {
        [P in keyof T & keyof AggregateTransformerConfig]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateTransformerConfig[P]>
      : GetScalarType<T[P], AggregateTransformerConfig[P]>
  }




  export type TransformerConfigGroupByArgs = {
    where?: TransformerConfigWhereInput
    orderBy?: Enumerable<TransformerConfigOrderByWithAggregationInput>
    by: Array<TransformerConfigScalarFieldEnum>
    having?: TransformerConfigScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: TransformerConfigCountAggregateInputType | true
    _min?: TransformerConfigMinAggregateInputType
    _max?: TransformerConfigMaxAggregateInputType
  }


  export type TransformerConfigGroupByOutputType = {
    id: string
    createdAt: Date
    updatedAt: Date
    meta: JsonValue
    transformerId: string
    conversationLogicId: string | null
    _count: TransformerConfigCountAggregateOutputType | null
    _min: TransformerConfigMinAggregateOutputType | null
    _max: TransformerConfigMaxAggregateOutputType | null
  }

  type GetTransformerConfigGroupByPayload<T extends TransformerConfigGroupByArgs> = PrismaPromise<
    Array<
      PickArray<TransformerConfigGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof TransformerConfigGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], TransformerConfigGroupByOutputType[P]>
            : GetScalarType<T[P], TransformerConfigGroupByOutputType[P]>
        }
      >
    >


  export type TransformerConfigSelect = {
    id?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    meta?: boolean
    transformer?: boolean | TransformerArgs
    transformerId?: boolean
    ConversationLogic?: boolean | ConversationLogicArgs
    conversationLogicId?: boolean
  }

  export type TransformerConfigInclude = {
    transformer?: boolean | TransformerArgs
    ConversationLogic?: boolean | ConversationLogicArgs
  }

  export type TransformerConfigGetPayload<
    S extends boolean | null | undefined | TransformerConfigArgs,
    U = keyof S
      > = S extends true
        ? TransformerConfig
    : S extends undefined
    ? never
    : S extends TransformerConfigArgs | TransformerConfigFindManyArgs
    ?'include' extends U
    ? TransformerConfig  & {
    [P in TrueKeys<S['include']>]:
        P extends 'transformer' ? TransformerGetPayload<S['include'][P]> :
        P extends 'ConversationLogic' ? ConversationLogicGetPayload<S['include'][P]> | null :  never
  } 
    : 'select' extends U
    ? {
    [P in TrueKeys<S['select']>]:
        P extends 'transformer' ? TransformerGetPayload<S['select'][P]> :
        P extends 'ConversationLogic' ? ConversationLogicGetPayload<S['select'][P]> | null :  P extends keyof TransformerConfig ? TransformerConfig[P] : never
  } 
    : TransformerConfig
  : TransformerConfig


  type TransformerConfigCountArgs = Merge<
    Omit<TransformerConfigFindManyArgs, 'select' | 'include'> & {
      select?: TransformerConfigCountAggregateInputType | true
    }
  >

  export interface TransformerConfigDelegate<GlobalRejectSettings> {
    /**
     * Find zero or one TransformerConfig that matches the filter.
     * @param {TransformerConfigFindUniqueArgs} args - Arguments to find a TransformerConfig
     * @example
     * // Get one TransformerConfig
     * const transformerConfig = await prisma.transformerConfig.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUnique<T extends TransformerConfigFindUniqueArgs,  LocalRejectSettings = T["rejectOnNotFound"] extends RejectOnNotFound ? T['rejectOnNotFound'] : undefined>(
      args: SelectSubset<T, TransformerConfigFindUniqueArgs>
    ): HasReject<GlobalRejectSettings, LocalRejectSettings, 'findUnique', 'TransformerConfig'> extends True ? CheckSelect<T, Prisma__TransformerConfigClient<TransformerConfig>, Prisma__TransformerConfigClient<TransformerConfigGetPayload<T>>> : CheckSelect<T, Prisma__TransformerConfigClient<TransformerConfig | null >, Prisma__TransformerConfigClient<TransformerConfigGetPayload<T> | null >>

    /**
     * Find the first TransformerConfig that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TransformerConfigFindFirstArgs} args - Arguments to find a TransformerConfig
     * @example
     * // Get one TransformerConfig
     * const transformerConfig = await prisma.transformerConfig.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirst<T extends TransformerConfigFindFirstArgs,  LocalRejectSettings = T["rejectOnNotFound"] extends RejectOnNotFound ? T['rejectOnNotFound'] : undefined>(
      args?: SelectSubset<T, TransformerConfigFindFirstArgs>
    ): HasReject<GlobalRejectSettings, LocalRejectSettings, 'findFirst', 'TransformerConfig'> extends True ? CheckSelect<T, Prisma__TransformerConfigClient<TransformerConfig>, Prisma__TransformerConfigClient<TransformerConfigGetPayload<T>>> : CheckSelect<T, Prisma__TransformerConfigClient<TransformerConfig | null >, Prisma__TransformerConfigClient<TransformerConfigGetPayload<T> | null >>

    /**
     * Find zero or more TransformerConfigs that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TransformerConfigFindManyArgs=} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all TransformerConfigs
     * const transformerConfigs = await prisma.transformerConfig.findMany()
     * 
     * // Get first 10 TransformerConfigs
     * const transformerConfigs = await prisma.transformerConfig.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const transformerConfigWithIdOnly = await prisma.transformerConfig.findMany({ select: { id: true } })
     * 
    **/
    findMany<T extends TransformerConfigFindManyArgs>(
      args?: SelectSubset<T, TransformerConfigFindManyArgs>
    ): CheckSelect<T, PrismaPromise<Array<TransformerConfig>>, PrismaPromise<Array<TransformerConfigGetPayload<T>>>>

    /**
     * Create a TransformerConfig.
     * @param {TransformerConfigCreateArgs} args - Arguments to create a TransformerConfig.
     * @example
     * // Create one TransformerConfig
     * const TransformerConfig = await prisma.transformerConfig.create({
     *   data: {
     *     // ... data to create a TransformerConfig
     *   }
     * })
     * 
    **/
    create<T extends TransformerConfigCreateArgs>(
      args: SelectSubset<T, TransformerConfigCreateArgs>
    ): CheckSelect<T, Prisma__TransformerConfigClient<TransformerConfig>, Prisma__TransformerConfigClient<TransformerConfigGetPayload<T>>>

    /**
     * Create many TransformerConfigs.
     *     @param {TransformerConfigCreateManyArgs} args - Arguments to create many TransformerConfigs.
     *     @example
     *     // Create many TransformerConfigs
     *     const transformerConfig = await prisma.transformerConfig.createMany({
     *       data: {
     *         // ... provide data here
     *       }
     *     })
     *     
    **/
    createMany<T extends TransformerConfigCreateManyArgs>(
      args?: SelectSubset<T, TransformerConfigCreateManyArgs>
    ): PrismaPromise<BatchPayload>

    /**
     * Delete a TransformerConfig.
     * @param {TransformerConfigDeleteArgs} args - Arguments to delete one TransformerConfig.
     * @example
     * // Delete one TransformerConfig
     * const TransformerConfig = await prisma.transformerConfig.delete({
     *   where: {
     *     // ... filter to delete one TransformerConfig
     *   }
     * })
     * 
    **/
    delete<T extends TransformerConfigDeleteArgs>(
      args: SelectSubset<T, TransformerConfigDeleteArgs>
    ): CheckSelect<T, Prisma__TransformerConfigClient<TransformerConfig>, Prisma__TransformerConfigClient<TransformerConfigGetPayload<T>>>

    /**
     * Update one TransformerConfig.
     * @param {TransformerConfigUpdateArgs} args - Arguments to update one TransformerConfig.
     * @example
     * // Update one TransformerConfig
     * const transformerConfig = await prisma.transformerConfig.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    update<T extends TransformerConfigUpdateArgs>(
      args: SelectSubset<T, TransformerConfigUpdateArgs>
    ): CheckSelect<T, Prisma__TransformerConfigClient<TransformerConfig>, Prisma__TransformerConfigClient<TransformerConfigGetPayload<T>>>

    /**
     * Delete zero or more TransformerConfigs.
     * @param {TransformerConfigDeleteManyArgs} args - Arguments to filter TransformerConfigs to delete.
     * @example
     * // Delete a few TransformerConfigs
     * const { count } = await prisma.transformerConfig.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
    **/
    deleteMany<T extends TransformerConfigDeleteManyArgs>(
      args?: SelectSubset<T, TransformerConfigDeleteManyArgs>
    ): PrismaPromise<BatchPayload>

    /**
     * Update zero or more TransformerConfigs.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TransformerConfigUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many TransformerConfigs
     * const transformerConfig = await prisma.transformerConfig.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    updateMany<T extends TransformerConfigUpdateManyArgs>(
      args: SelectSubset<T, TransformerConfigUpdateManyArgs>
    ): PrismaPromise<BatchPayload>

    /**
     * Create or update one TransformerConfig.
     * @param {TransformerConfigUpsertArgs} args - Arguments to update or create a TransformerConfig.
     * @example
     * // Update or create a TransformerConfig
     * const transformerConfig = await prisma.transformerConfig.upsert({
     *   create: {
     *     // ... data to create a TransformerConfig
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the TransformerConfig we want to update
     *   }
     * })
    **/
    upsert<T extends TransformerConfigUpsertArgs>(
      args: SelectSubset<T, TransformerConfigUpsertArgs>
    ): CheckSelect<T, Prisma__TransformerConfigClient<TransformerConfig>, Prisma__TransformerConfigClient<TransformerConfigGetPayload<T>>>

    /**
     * Count the number of TransformerConfigs.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TransformerConfigCountArgs} args - Arguments to filter TransformerConfigs to count.
     * @example
     * // Count the number of TransformerConfigs
     * const count = await prisma.transformerConfig.count({
     *   where: {
     *     // ... the filter for the TransformerConfigs we want to count
     *   }
     * })
    **/
    count<T extends TransformerConfigCountArgs>(
      args?: Subset<T, TransformerConfigCountArgs>,
    ): PrismaPromise<
      T extends _Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], TransformerConfigCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a TransformerConfig.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TransformerConfigAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends TransformerConfigAggregateArgs>(args: Subset<T, TransformerConfigAggregateArgs>): PrismaPromise<GetTransformerConfigAggregateType<T>>

    /**
     * Group by TransformerConfig.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TransformerConfigGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends TransformerConfigGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: TransformerConfigGroupByArgs['orderBy'] }
        : { orderBy?: TransformerConfigGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends TupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, TransformerConfigGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetTransformerConfigGroupByPayload<T> : PrismaPromise<InputErrors>
  }

  /**
   * The delegate class that acts as a "Promise-like" for TransformerConfig.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export class Prisma__TransformerConfigClient<T> implements PrismaPromise<T> {
    [prisma]: true;
    private readonly _dmmf;
    private readonly _fetcher;
    private readonly _queryType;
    private readonly _rootField;
    private readonly _clientMethod;
    private readonly _args;
    private readonly _dataPath;
    private readonly _errorFormat;
    private readonly _measurePerformance?;
    private _isList;
    private _callsite;
    private _requestPromise?;
    constructor(_dmmf: runtime.DMMFClass, _fetcher: PrismaClientFetcher, _queryType: 'query' | 'mutation', _rootField: string, _clientMethod: string, _args: any, _dataPath: string[], _errorFormat: ErrorFormat, _measurePerformance?: boolean | undefined, _isList?: boolean);
    readonly [Symbol.toStringTag]: 'PrismaClientPromise';

    transformer<T extends TransformerArgs = {}>(args?: Subset<T, TransformerArgs>): CheckSelect<T, Prisma__TransformerClient<Transformer | null >, Prisma__TransformerClient<TransformerGetPayload<T> | null >>;

    ConversationLogic<T extends ConversationLogicArgs = {}>(args?: Subset<T, ConversationLogicArgs>): CheckSelect<T, Prisma__ConversationLogicClient<ConversationLogic | null >, Prisma__ConversationLogicClient<ConversationLogicGetPayload<T> | null >>;

    private get _document();
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): Promise<TResult1 | TResult2>;
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): Promise<T | TResult>;
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): Promise<T>;
  }

  // Custom InputTypes

  /**
   * TransformerConfig findUnique
   */
  export type TransformerConfigFindUniqueArgs = {
    /**
     * Select specific fields to fetch from the TransformerConfig
     * 
    **/
    select?: TransformerConfigSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: TransformerConfigInclude | null
    /**
     * Throw an Error if a TransformerConfig can't be found
     * 
    **/
    rejectOnNotFound?: RejectOnNotFound
    /**
     * Filter, which TransformerConfig to fetch.
     * 
    **/
    where: TransformerConfigWhereUniqueInput
  }


  /**
   * TransformerConfig findFirst
   */
  export type TransformerConfigFindFirstArgs = {
    /**
     * Select specific fields to fetch from the TransformerConfig
     * 
    **/
    select?: TransformerConfigSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: TransformerConfigInclude | null
    /**
     * Throw an Error if a TransformerConfig can't be found
     * 
    **/
    rejectOnNotFound?: RejectOnNotFound
    /**
     * Filter, which TransformerConfig to fetch.
     * 
    **/
    where?: TransformerConfigWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of TransformerConfigs to fetch.
     * 
    **/
    orderBy?: Enumerable<TransformerConfigOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for TransformerConfigs.
     * 
    **/
    cursor?: TransformerConfigWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` TransformerConfigs from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` TransformerConfigs.
     * 
    **/
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of TransformerConfigs.
     * 
    **/
    distinct?: Enumerable<TransformerConfigScalarFieldEnum>
  }


  /**
   * TransformerConfig findMany
   */
  export type TransformerConfigFindManyArgs = {
    /**
     * Select specific fields to fetch from the TransformerConfig
     * 
    **/
    select?: TransformerConfigSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: TransformerConfigInclude | null
    /**
     * Filter, which TransformerConfigs to fetch.
     * 
    **/
    where?: TransformerConfigWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of TransformerConfigs to fetch.
     * 
    **/
    orderBy?: Enumerable<TransformerConfigOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing TransformerConfigs.
     * 
    **/
    cursor?: TransformerConfigWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` TransformerConfigs from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` TransformerConfigs.
     * 
    **/
    skip?: number
    distinct?: Enumerable<TransformerConfigScalarFieldEnum>
  }


  /**
   * TransformerConfig create
   */
  export type TransformerConfigCreateArgs = {
    /**
     * Select specific fields to fetch from the TransformerConfig
     * 
    **/
    select?: TransformerConfigSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: TransformerConfigInclude | null
    /**
     * The data needed to create a TransformerConfig.
     * 
    **/
    data: XOR<TransformerConfigCreateInput, TransformerConfigUncheckedCreateInput>
  }


  /**
   * TransformerConfig createMany
   */
  export type TransformerConfigCreateManyArgs = {
    /**
     * The data used to create many TransformerConfigs.
     * 
    **/
    data: Enumerable<TransformerConfigCreateManyInput>
    skipDuplicates?: boolean
  }


  /**
   * TransformerConfig update
   */
  export type TransformerConfigUpdateArgs = {
    /**
     * Select specific fields to fetch from the TransformerConfig
     * 
    **/
    select?: TransformerConfigSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: TransformerConfigInclude | null
    /**
     * The data needed to update a TransformerConfig.
     * 
    **/
    data: XOR<TransformerConfigUpdateInput, TransformerConfigUncheckedUpdateInput>
    /**
     * Choose, which TransformerConfig to update.
     * 
    **/
    where: TransformerConfigWhereUniqueInput
  }


  /**
   * TransformerConfig updateMany
   */
  export type TransformerConfigUpdateManyArgs = {
    /**
     * The data used to update TransformerConfigs.
     * 
    **/
    data: XOR<TransformerConfigUpdateManyMutationInput, TransformerConfigUncheckedUpdateManyInput>
    /**
     * Filter which TransformerConfigs to update
     * 
    **/
    where?: TransformerConfigWhereInput
  }


  /**
   * TransformerConfig upsert
   */
  export type TransformerConfigUpsertArgs = {
    /**
     * Select specific fields to fetch from the TransformerConfig
     * 
    **/
    select?: TransformerConfigSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: TransformerConfigInclude | null
    /**
     * The filter to search for the TransformerConfig to update in case it exists.
     * 
    **/
    where: TransformerConfigWhereUniqueInput
    /**
     * In case the TransformerConfig found by the `where` argument doesn't exist, create a new TransformerConfig with this data.
     * 
    **/
    create: XOR<TransformerConfigCreateInput, TransformerConfigUncheckedCreateInput>
    /**
     * In case the TransformerConfig was found with the provided `where` argument, update it with this data.
     * 
    **/
    update: XOR<TransformerConfigUpdateInput, TransformerConfigUncheckedUpdateInput>
  }


  /**
   * TransformerConfig delete
   */
  export type TransformerConfigDeleteArgs = {
    /**
     * Select specific fields to fetch from the TransformerConfig
     * 
    **/
    select?: TransformerConfigSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: TransformerConfigInclude | null
    /**
     * Filter which TransformerConfig to delete.
     * 
    **/
    where: TransformerConfigWhereUniqueInput
  }


  /**
   * TransformerConfig deleteMany
   */
  export type TransformerConfigDeleteManyArgs = {
    /**
     * Filter which TransformerConfigs to delete
     * 
    **/
    where?: TransformerConfigWhereInput
  }


  /**
   * TransformerConfig without action
   */
  export type TransformerConfigArgs = {
    /**
     * Select specific fields to fetch from the TransformerConfig
     * 
    **/
    select?: TransformerConfigSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: TransformerConfigInclude | null
  }



  /**
   * Model Bot
   */


  export type AggregateBot = {
    _count: BotCountAggregateOutputType | null
    _min: BotMinAggregateOutputType | null
    _max: BotMaxAggregateOutputType | null
  }

  export type BotMinAggregateOutputType = {
    id: string | null
    createdAt: Date | null
    updatedAt: Date | null
    name: string | null
    startingMessage: string | null
    ownerID: string | null
    ownerOrgID: string | null
    purpose: string | null
    description: string | null
    startDate: Date | null
    endDate: Date | null
  }

  export type BotMaxAggregateOutputType = {
    id: string | null
    createdAt: Date | null
    updatedAt: Date | null
    name: string | null
    startingMessage: string | null
    ownerID: string | null
    ownerOrgID: string | null
    purpose: string | null
    description: string | null
    startDate: Date | null
    endDate: Date | null
  }

  export type BotCountAggregateOutputType = {
    id: number
    createdAt: number
    updatedAt: number
    name: number
    startingMessage: number
    ownerID: number
    ownerOrgID: number
    purpose: number
    description: number
    startDate: number
    endDate: number
    _all: number
  }


  export type BotMinAggregateInputType = {
    id?: true
    createdAt?: true
    updatedAt?: true
    name?: true
    startingMessage?: true
    ownerID?: true
    ownerOrgID?: true
    purpose?: true
    description?: true
    startDate?: true
    endDate?: true
  }

  export type BotMaxAggregateInputType = {
    id?: true
    createdAt?: true
    updatedAt?: true
    name?: true
    startingMessage?: true
    ownerID?: true
    ownerOrgID?: true
    purpose?: true
    description?: true
    startDate?: true
    endDate?: true
  }

  export type BotCountAggregateInputType = {
    id?: true
    createdAt?: true
    updatedAt?: true
    name?: true
    startingMessage?: true
    ownerID?: true
    ownerOrgID?: true
    purpose?: true
    description?: true
    startDate?: true
    endDate?: true
    _all?: true
  }

  export type BotAggregateArgs = {
    /**
     * Filter which Bot to aggregate.
     * 
    **/
    where?: BotWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Bots to fetch.
     * 
    **/
    orderBy?: Enumerable<BotOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     * 
    **/
    cursor?: BotWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Bots from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Bots.
     * 
    **/
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Bots
    **/
    _count?: true | BotCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: BotMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: BotMaxAggregateInputType
  }

  export type GetBotAggregateType<T extends BotAggregateArgs> = {
        [P in keyof T & keyof AggregateBot]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateBot[P]>
      : GetScalarType<T[P], AggregateBot[P]>
  }




  export type BotGroupByArgs = {
    where?: BotWhereInput
    orderBy?: Enumerable<BotOrderByWithAggregationInput>
    by: Array<BotScalarFieldEnum>
    having?: BotScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: BotCountAggregateInputType | true
    _min?: BotMinAggregateInputType
    _max?: BotMaxAggregateInputType
  }


  export type BotGroupByOutputType = {
    id: string
    createdAt: Date
    updatedAt: Date
    name: string
    startingMessage: string
    ownerID: string | null
    ownerOrgID: string | null
    purpose: string | null
    description: string | null
    startDate: Date | null
    endDate: Date | null
    _count: BotCountAggregateOutputType | null
    _min: BotMinAggregateOutputType | null
    _max: BotMaxAggregateOutputType | null
  }

  type GetBotGroupByPayload<T extends BotGroupByArgs> = PrismaPromise<
    Array<
      PickArray<BotGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof BotGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], BotGroupByOutputType[P]>
            : GetScalarType<T[P], BotGroupByOutputType[P]>
        }
      >
    >


  export type BotSelect = {
    id?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    name?: boolean
    startingMessage?: boolean
    users?: boolean | UserSegmentFindManyArgs
    logicIDs?: boolean | ConversationLogicFindManyArgs
    ownerID?: boolean
    ownerOrgID?: boolean
    purpose?: boolean
    description?: boolean
    startDate?: boolean
    endDate?: boolean
    _count?: boolean | BotCountOutputTypeArgs
  }

  export type BotInclude = {
    users?: boolean | UserSegmentFindManyArgs
    logicIDs?: boolean | ConversationLogicFindManyArgs
    _count?: boolean | BotCountOutputTypeArgs
  }

  export type BotGetPayload<
    S extends boolean | null | undefined | BotArgs,
    U = keyof S
      > = S extends true
        ? Bot
    : S extends undefined
    ? never
    : S extends BotArgs | BotFindManyArgs
    ?'include' extends U
    ? Bot  & {
    [P in TrueKeys<S['include']>]:
        P extends 'users' ? Array < UserSegmentGetPayload<S['include'][P]>>  :
        P extends 'logicIDs' ? Array < ConversationLogicGetPayload<S['include'][P]>>  :
        P extends '_count' ? BotCountOutputTypeGetPayload<S['include'][P]> :  never
  } 
    : 'select' extends U
    ? {
    [P in TrueKeys<S['select']>]:
        P extends 'users' ? Array < UserSegmentGetPayload<S['select'][P]>>  :
        P extends 'logicIDs' ? Array < ConversationLogicGetPayload<S['select'][P]>>  :
        P extends '_count' ? BotCountOutputTypeGetPayload<S['select'][P]> :  P extends keyof Bot ? Bot[P] : never
  } 
    : Bot
  : Bot


  type BotCountArgs = Merge<
    Omit<BotFindManyArgs, 'select' | 'include'> & {
      select?: BotCountAggregateInputType | true
    }
  >

  export interface BotDelegate<GlobalRejectSettings> {
    /**
     * Find zero or one Bot that matches the filter.
     * @param {BotFindUniqueArgs} args - Arguments to find a Bot
     * @example
     * // Get one Bot
     * const bot = await prisma.bot.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUnique<T extends BotFindUniqueArgs,  LocalRejectSettings = T["rejectOnNotFound"] extends RejectOnNotFound ? T['rejectOnNotFound'] : undefined>(
      args: SelectSubset<T, BotFindUniqueArgs>
    ): HasReject<GlobalRejectSettings, LocalRejectSettings, 'findUnique', 'Bot'> extends True ? CheckSelect<T, Prisma__BotClient<Bot>, Prisma__BotClient<BotGetPayload<T>>> : CheckSelect<T, Prisma__BotClient<Bot | null >, Prisma__BotClient<BotGetPayload<T> | null >>

    /**
     * Find the first Bot that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BotFindFirstArgs} args - Arguments to find a Bot
     * @example
     * // Get one Bot
     * const bot = await prisma.bot.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirst<T extends BotFindFirstArgs,  LocalRejectSettings = T["rejectOnNotFound"] extends RejectOnNotFound ? T['rejectOnNotFound'] : undefined>(
      args?: SelectSubset<T, BotFindFirstArgs>
    ): HasReject<GlobalRejectSettings, LocalRejectSettings, 'findFirst', 'Bot'> extends True ? CheckSelect<T, Prisma__BotClient<Bot>, Prisma__BotClient<BotGetPayload<T>>> : CheckSelect<T, Prisma__BotClient<Bot | null >, Prisma__BotClient<BotGetPayload<T> | null >>

    /**
     * Find zero or more Bots that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BotFindManyArgs=} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Bots
     * const bots = await prisma.bot.findMany()
     * 
     * // Get first 10 Bots
     * const bots = await prisma.bot.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const botWithIdOnly = await prisma.bot.findMany({ select: { id: true } })
     * 
    **/
    findMany<T extends BotFindManyArgs>(
      args?: SelectSubset<T, BotFindManyArgs>
    ): CheckSelect<T, PrismaPromise<Array<Bot>>, PrismaPromise<Array<BotGetPayload<T>>>>

    /**
     * Create a Bot.
     * @param {BotCreateArgs} args - Arguments to create a Bot.
     * @example
     * // Create one Bot
     * const Bot = await prisma.bot.create({
     *   data: {
     *     // ... data to create a Bot
     *   }
     * })
     * 
    **/
    create<T extends BotCreateArgs>(
      args: SelectSubset<T, BotCreateArgs>
    ): CheckSelect<T, Prisma__BotClient<Bot>, Prisma__BotClient<BotGetPayload<T>>>

    /**
     * Create many Bots.
     *     @param {BotCreateManyArgs} args - Arguments to create many Bots.
     *     @example
     *     // Create many Bots
     *     const bot = await prisma.bot.createMany({
     *       data: {
     *         // ... provide data here
     *       }
     *     })
     *     
    **/
    createMany<T extends BotCreateManyArgs>(
      args?: SelectSubset<T, BotCreateManyArgs>
    ): PrismaPromise<BatchPayload>

    /**
     * Delete a Bot.
     * @param {BotDeleteArgs} args - Arguments to delete one Bot.
     * @example
     * // Delete one Bot
     * const Bot = await prisma.bot.delete({
     *   where: {
     *     // ... filter to delete one Bot
     *   }
     * })
     * 
    **/
    delete<T extends BotDeleteArgs>(
      args: SelectSubset<T, BotDeleteArgs>
    ): CheckSelect<T, Prisma__BotClient<Bot>, Prisma__BotClient<BotGetPayload<T>>>

    /**
     * Update one Bot.
     * @param {BotUpdateArgs} args - Arguments to update one Bot.
     * @example
     * // Update one Bot
     * const bot = await prisma.bot.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    update<T extends BotUpdateArgs>(
      args: SelectSubset<T, BotUpdateArgs>
    ): CheckSelect<T, Prisma__BotClient<Bot>, Prisma__BotClient<BotGetPayload<T>>>

    /**
     * Delete zero or more Bots.
     * @param {BotDeleteManyArgs} args - Arguments to filter Bots to delete.
     * @example
     * // Delete a few Bots
     * const { count } = await prisma.bot.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
    **/
    deleteMany<T extends BotDeleteManyArgs>(
      args?: SelectSubset<T, BotDeleteManyArgs>
    ): PrismaPromise<BatchPayload>

    /**
     * Update zero or more Bots.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BotUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Bots
     * const bot = await prisma.bot.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    updateMany<T extends BotUpdateManyArgs>(
      args: SelectSubset<T, BotUpdateManyArgs>
    ): PrismaPromise<BatchPayload>

    /**
     * Create or update one Bot.
     * @param {BotUpsertArgs} args - Arguments to update or create a Bot.
     * @example
     * // Update or create a Bot
     * const bot = await prisma.bot.upsert({
     *   create: {
     *     // ... data to create a Bot
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Bot we want to update
     *   }
     * })
    **/
    upsert<T extends BotUpsertArgs>(
      args: SelectSubset<T, BotUpsertArgs>
    ): CheckSelect<T, Prisma__BotClient<Bot>, Prisma__BotClient<BotGetPayload<T>>>

    /**
     * Count the number of Bots.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BotCountArgs} args - Arguments to filter Bots to count.
     * @example
     * // Count the number of Bots
     * const count = await prisma.bot.count({
     *   where: {
     *     // ... the filter for the Bots we want to count
     *   }
     * })
    **/
    count<T extends BotCountArgs>(
      args?: Subset<T, BotCountArgs>,
    ): PrismaPromise<
      T extends _Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], BotCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Bot.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BotAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends BotAggregateArgs>(args: Subset<T, BotAggregateArgs>): PrismaPromise<GetBotAggregateType<T>>

    /**
     * Group by Bot.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BotGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends BotGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: BotGroupByArgs['orderBy'] }
        : { orderBy?: BotGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends TupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, BotGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetBotGroupByPayload<T> : PrismaPromise<InputErrors>
  }

  /**
   * The delegate class that acts as a "Promise-like" for Bot.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export class Prisma__BotClient<T> implements PrismaPromise<T> {
    [prisma]: true;
    private readonly _dmmf;
    private readonly _fetcher;
    private readonly _queryType;
    private readonly _rootField;
    private readonly _clientMethod;
    private readonly _args;
    private readonly _dataPath;
    private readonly _errorFormat;
    private readonly _measurePerformance?;
    private _isList;
    private _callsite;
    private _requestPromise?;
    constructor(_dmmf: runtime.DMMFClass, _fetcher: PrismaClientFetcher, _queryType: 'query' | 'mutation', _rootField: string, _clientMethod: string, _args: any, _dataPath: string[], _errorFormat: ErrorFormat, _measurePerformance?: boolean | undefined, _isList?: boolean);
    readonly [Symbol.toStringTag]: 'PrismaClientPromise';

    users<T extends UserSegmentFindManyArgs = {}>(args?: Subset<T, UserSegmentFindManyArgs>): CheckSelect<T, PrismaPromise<Array<UserSegment>>, PrismaPromise<Array<UserSegmentGetPayload<T>>>>;

    logicIDs<T extends ConversationLogicFindManyArgs = {}>(args?: Subset<T, ConversationLogicFindManyArgs>): CheckSelect<T, PrismaPromise<Array<ConversationLogic>>, PrismaPromise<Array<ConversationLogicGetPayload<T>>>>;

    private get _document();
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): Promise<TResult1 | TResult2>;
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): Promise<T | TResult>;
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): Promise<T>;
  }

  // Custom InputTypes

  /**
   * Bot findUnique
   */
  export type BotFindUniqueArgs = {
    /**
     * Select specific fields to fetch from the Bot
     * 
    **/
    select?: BotSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: BotInclude | null
    /**
     * Throw an Error if a Bot can't be found
     * 
    **/
    rejectOnNotFound?: RejectOnNotFound
    /**
     * Filter, which Bot to fetch.
     * 
    **/
    where: BotWhereUniqueInput
  }


  /**
   * Bot findFirst
   */
  export type BotFindFirstArgs = {
    /**
     * Select specific fields to fetch from the Bot
     * 
    **/
    select?: BotSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: BotInclude | null
    /**
     * Throw an Error if a Bot can't be found
     * 
    **/
    rejectOnNotFound?: RejectOnNotFound
    /**
     * Filter, which Bot to fetch.
     * 
    **/
    where?: BotWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Bots to fetch.
     * 
    **/
    orderBy?: Enumerable<BotOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Bots.
     * 
    **/
    cursor?: BotWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Bots from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Bots.
     * 
    **/
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Bots.
     * 
    **/
    distinct?: Enumerable<BotScalarFieldEnum>
  }


  /**
   * Bot findMany
   */
  export type BotFindManyArgs = {
    /**
     * Select specific fields to fetch from the Bot
     * 
    **/
    select?: BotSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: BotInclude | null
    /**
     * Filter, which Bots to fetch.
     * 
    **/
    where?: BotWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Bots to fetch.
     * 
    **/
    orderBy?: Enumerable<BotOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Bots.
     * 
    **/
    cursor?: BotWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Bots from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Bots.
     * 
    **/
    skip?: number
    distinct?: Enumerable<BotScalarFieldEnum>
  }


  /**
   * Bot create
   */
  export type BotCreateArgs = {
    /**
     * Select specific fields to fetch from the Bot
     * 
    **/
    select?: BotSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: BotInclude | null
    /**
     * The data needed to create a Bot.
     * 
    **/
    data: XOR<BotCreateInput, BotUncheckedCreateInput>
  }


  /**
   * Bot createMany
   */
  export type BotCreateManyArgs = {
    /**
     * The data used to create many Bots.
     * 
    **/
    data: Enumerable<BotCreateManyInput>
    skipDuplicates?: boolean
  }


  /**
   * Bot update
   */
  export type BotUpdateArgs = {
    /**
     * Select specific fields to fetch from the Bot
     * 
    **/
    select?: BotSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: BotInclude | null
    /**
     * The data needed to update a Bot.
     * 
    **/
    data: XOR<BotUpdateInput, BotUncheckedUpdateInput>
    /**
     * Choose, which Bot to update.
     * 
    **/
    where: BotWhereUniqueInput
  }


  /**
   * Bot updateMany
   */
  export type BotUpdateManyArgs = {
    /**
     * The data used to update Bots.
     * 
    **/
    data: XOR<BotUpdateManyMutationInput, BotUncheckedUpdateManyInput>
    /**
     * Filter which Bots to update
     * 
    **/
    where?: BotWhereInput
  }


  /**
   * Bot upsert
   */
  export type BotUpsertArgs = {
    /**
     * Select specific fields to fetch from the Bot
     * 
    **/
    select?: BotSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: BotInclude | null
    /**
     * The filter to search for the Bot to update in case it exists.
     * 
    **/
    where: BotWhereUniqueInput
    /**
     * In case the Bot found by the `where` argument doesn't exist, create a new Bot with this data.
     * 
    **/
    create: XOR<BotCreateInput, BotUncheckedCreateInput>
    /**
     * In case the Bot was found with the provided `where` argument, update it with this data.
     * 
    **/
    update: XOR<BotUpdateInput, BotUncheckedUpdateInput>
  }


  /**
   * Bot delete
   */
  export type BotDeleteArgs = {
    /**
     * Select specific fields to fetch from the Bot
     * 
    **/
    select?: BotSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: BotInclude | null
    /**
     * Filter which Bot to delete.
     * 
    **/
    where: BotWhereUniqueInput
  }


  /**
   * Bot deleteMany
   */
  export type BotDeleteManyArgs = {
    /**
     * Filter which Bots to delete
     * 
    **/
    where?: BotWhereInput
  }


  /**
   * Bot without action
   */
  export type BotArgs = {
    /**
     * Select specific fields to fetch from the Bot
     * 
    **/
    select?: BotSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: BotInclude | null
  }



  /**
   * Model UserSegment
   */


  export type AggregateUserSegment = {
    _count: UserSegmentCountAggregateOutputType | null
    _avg: UserSegmentAvgAggregateOutputType | null
    _sum: UserSegmentSumAggregateOutputType | null
    _min: UserSegmentMinAggregateOutputType | null
    _max: UserSegmentMaxAggregateOutputType | null
  }

  export type UserSegmentAvgAggregateOutputType = {
    count: number | null
  }

  export type UserSegmentSumAggregateOutputType = {
    count: number | null
  }

  export type UserSegmentMinAggregateOutputType = {
    id: string | null
    createdAt: Date | null
    updatedAt: Date | null
    name: string | null
    description: string | null
    count: number | null
    category: string | null
    allServiceID: string | null
    byPhoneServiceID: string | null
    byIDServiceID: string | null
    botId: string | null
  }

  export type UserSegmentMaxAggregateOutputType = {
    id: string | null
    createdAt: Date | null
    updatedAt: Date | null
    name: string | null
    description: string | null
    count: number | null
    category: string | null
    allServiceID: string | null
    byPhoneServiceID: string | null
    byIDServiceID: string | null
    botId: string | null
  }

  export type UserSegmentCountAggregateOutputType = {
    id: number
    createdAt: number
    updatedAt: number
    name: number
    description: number
    count: number
    category: number
    allServiceID: number
    byPhoneServiceID: number
    byIDServiceID: number
    botId: number
    _all: number
  }


  export type UserSegmentAvgAggregateInputType = {
    count?: true
  }

  export type UserSegmentSumAggregateInputType = {
    count?: true
  }

  export type UserSegmentMinAggregateInputType = {
    id?: true
    createdAt?: true
    updatedAt?: true
    name?: true
    description?: true
    count?: true
    category?: true
    allServiceID?: true
    byPhoneServiceID?: true
    byIDServiceID?: true
    botId?: true
  }

  export type UserSegmentMaxAggregateInputType = {
    id?: true
    createdAt?: true
    updatedAt?: true
    name?: true
    description?: true
    count?: true
    category?: true
    allServiceID?: true
    byPhoneServiceID?: true
    byIDServiceID?: true
    botId?: true
  }

  export type UserSegmentCountAggregateInputType = {
    id?: true
    createdAt?: true
    updatedAt?: true
    name?: true
    description?: true
    count?: true
    category?: true
    allServiceID?: true
    byPhoneServiceID?: true
    byIDServiceID?: true
    botId?: true
    _all?: true
  }

  export type UserSegmentAggregateArgs = {
    /**
     * Filter which UserSegment to aggregate.
     * 
    **/
    where?: UserSegmentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of UserSegments to fetch.
     * 
    **/
    orderBy?: Enumerable<UserSegmentOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     * 
    **/
    cursor?: UserSegmentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` UserSegments from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` UserSegments.
     * 
    **/
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned UserSegments
    **/
    _count?: true | UserSegmentCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: UserSegmentAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: UserSegmentSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: UserSegmentMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: UserSegmentMaxAggregateInputType
  }

  export type GetUserSegmentAggregateType<T extends UserSegmentAggregateArgs> = {
        [P in keyof T & keyof AggregateUserSegment]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateUserSegment[P]>
      : GetScalarType<T[P], AggregateUserSegment[P]>
  }




  export type UserSegmentGroupByArgs = {
    where?: UserSegmentWhereInput
    orderBy?: Enumerable<UserSegmentOrderByWithAggregationInput>
    by: Array<UserSegmentScalarFieldEnum>
    having?: UserSegmentScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: UserSegmentCountAggregateInputType | true
    _avg?: UserSegmentAvgAggregateInputType
    _sum?: UserSegmentSumAggregateInputType
    _min?: UserSegmentMinAggregateInputType
    _max?: UserSegmentMaxAggregateInputType
  }


  export type UserSegmentGroupByOutputType = {
    id: string
    createdAt: Date
    updatedAt: Date
    name: string
    description: string | null
    count: number
    category: string | null
    allServiceID: string | null
    byPhoneServiceID: string | null
    byIDServiceID: string | null
    botId: string | null
    _count: UserSegmentCountAggregateOutputType | null
    _avg: UserSegmentAvgAggregateOutputType | null
    _sum: UserSegmentSumAggregateOutputType | null
    _min: UserSegmentMinAggregateOutputType | null
    _max: UserSegmentMaxAggregateOutputType | null
  }

  type GetUserSegmentGroupByPayload<T extends UserSegmentGroupByArgs> = PrismaPromise<
    Array<
      PickArray<UserSegmentGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof UserSegmentGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], UserSegmentGroupByOutputType[P]>
            : GetScalarType<T[P], UserSegmentGroupByOutputType[P]>
        }
      >
    >


  export type UserSegmentSelect = {
    id?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    name?: boolean
    description?: boolean
    count?: boolean
    category?: boolean
    all?: boolean | ServiceArgs
    byID?: boolean | ServiceArgs
    byPhone?: boolean | ServiceArgs
    allServiceID?: boolean
    byPhoneServiceID?: boolean
    byIDServiceID?: boolean
    bots?: boolean | BotFindManyArgs
    botId?: boolean
    _count?: boolean | UserSegmentCountOutputTypeArgs
  }

  export type UserSegmentInclude = {
    all?: boolean | ServiceArgs
    byID?: boolean | ServiceArgs
    byPhone?: boolean | ServiceArgs
    bots?: boolean | BotFindManyArgs
    _count?: boolean | UserSegmentCountOutputTypeArgs
  }

  export type UserSegmentGetPayload<
    S extends boolean | null | undefined | UserSegmentArgs,
    U = keyof S
      > = S extends true
        ? UserSegment
    : S extends undefined
    ? never
    : S extends UserSegmentArgs | UserSegmentFindManyArgs
    ?'include' extends U
    ? UserSegment  & {
    [P in TrueKeys<S['include']>]:
        P extends 'all' ? ServiceGetPayload<S['include'][P]> | null :
        P extends 'byID' ? ServiceGetPayload<S['include'][P]> | null :
        P extends 'byPhone' ? ServiceGetPayload<S['include'][P]> | null :
        P extends 'bots' ? Array < BotGetPayload<S['include'][P]>>  :
        P extends '_count' ? UserSegmentCountOutputTypeGetPayload<S['include'][P]> :  never
  } 
    : 'select' extends U
    ? {
    [P in TrueKeys<S['select']>]:
        P extends 'all' ? ServiceGetPayload<S['select'][P]> | null :
        P extends 'byID' ? ServiceGetPayload<S['select'][P]> | null :
        P extends 'byPhone' ? ServiceGetPayload<S['select'][P]> | null :
        P extends 'bots' ? Array < BotGetPayload<S['select'][P]>>  :
        P extends '_count' ? UserSegmentCountOutputTypeGetPayload<S['select'][P]> :  P extends keyof UserSegment ? UserSegment[P] : never
  } 
    : UserSegment
  : UserSegment


  type UserSegmentCountArgs = Merge<
    Omit<UserSegmentFindManyArgs, 'select' | 'include'> & {
      select?: UserSegmentCountAggregateInputType | true
    }
  >

  export interface UserSegmentDelegate<GlobalRejectSettings> {
    /**
     * Find zero or one UserSegment that matches the filter.
     * @param {UserSegmentFindUniqueArgs} args - Arguments to find a UserSegment
     * @example
     * // Get one UserSegment
     * const userSegment = await prisma.userSegment.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUnique<T extends UserSegmentFindUniqueArgs,  LocalRejectSettings = T["rejectOnNotFound"] extends RejectOnNotFound ? T['rejectOnNotFound'] : undefined>(
      args: SelectSubset<T, UserSegmentFindUniqueArgs>
    ): HasReject<GlobalRejectSettings, LocalRejectSettings, 'findUnique', 'UserSegment'> extends True ? CheckSelect<T, Prisma__UserSegmentClient<UserSegment>, Prisma__UserSegmentClient<UserSegmentGetPayload<T>>> : CheckSelect<T, Prisma__UserSegmentClient<UserSegment | null >, Prisma__UserSegmentClient<UserSegmentGetPayload<T> | null >>

    /**
     * Find the first UserSegment that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserSegmentFindFirstArgs} args - Arguments to find a UserSegment
     * @example
     * // Get one UserSegment
     * const userSegment = await prisma.userSegment.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirst<T extends UserSegmentFindFirstArgs,  LocalRejectSettings = T["rejectOnNotFound"] extends RejectOnNotFound ? T['rejectOnNotFound'] : undefined>(
      args?: SelectSubset<T, UserSegmentFindFirstArgs>
    ): HasReject<GlobalRejectSettings, LocalRejectSettings, 'findFirst', 'UserSegment'> extends True ? CheckSelect<T, Prisma__UserSegmentClient<UserSegment>, Prisma__UserSegmentClient<UserSegmentGetPayload<T>>> : CheckSelect<T, Prisma__UserSegmentClient<UserSegment | null >, Prisma__UserSegmentClient<UserSegmentGetPayload<T> | null >>

    /**
     * Find zero or more UserSegments that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserSegmentFindManyArgs=} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all UserSegments
     * const userSegments = await prisma.userSegment.findMany()
     * 
     * // Get first 10 UserSegments
     * const userSegments = await prisma.userSegment.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const userSegmentWithIdOnly = await prisma.userSegment.findMany({ select: { id: true } })
     * 
    **/
    findMany<T extends UserSegmentFindManyArgs>(
      args?: SelectSubset<T, UserSegmentFindManyArgs>
    ): CheckSelect<T, PrismaPromise<Array<UserSegment>>, PrismaPromise<Array<UserSegmentGetPayload<T>>>>

    /**
     * Create a UserSegment.
     * @param {UserSegmentCreateArgs} args - Arguments to create a UserSegment.
     * @example
     * // Create one UserSegment
     * const UserSegment = await prisma.userSegment.create({
     *   data: {
     *     // ... data to create a UserSegment
     *   }
     * })
     * 
    **/
    create<T extends UserSegmentCreateArgs>(
      args: SelectSubset<T, UserSegmentCreateArgs>
    ): CheckSelect<T, Prisma__UserSegmentClient<UserSegment>, Prisma__UserSegmentClient<UserSegmentGetPayload<T>>>

    /**
     * Create many UserSegments.
     *     @param {UserSegmentCreateManyArgs} args - Arguments to create many UserSegments.
     *     @example
     *     // Create many UserSegments
     *     const userSegment = await prisma.userSegment.createMany({
     *       data: {
     *         // ... provide data here
     *       }
     *     })
     *     
    **/
    createMany<T extends UserSegmentCreateManyArgs>(
      args?: SelectSubset<T, UserSegmentCreateManyArgs>
    ): PrismaPromise<BatchPayload>

    /**
     * Delete a UserSegment.
     * @param {UserSegmentDeleteArgs} args - Arguments to delete one UserSegment.
     * @example
     * // Delete one UserSegment
     * const UserSegment = await prisma.userSegment.delete({
     *   where: {
     *     // ... filter to delete one UserSegment
     *   }
     * })
     * 
    **/
    delete<T extends UserSegmentDeleteArgs>(
      args: SelectSubset<T, UserSegmentDeleteArgs>
    ): CheckSelect<T, Prisma__UserSegmentClient<UserSegment>, Prisma__UserSegmentClient<UserSegmentGetPayload<T>>>

    /**
     * Update one UserSegment.
     * @param {UserSegmentUpdateArgs} args - Arguments to update one UserSegment.
     * @example
     * // Update one UserSegment
     * const userSegment = await prisma.userSegment.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    update<T extends UserSegmentUpdateArgs>(
      args: SelectSubset<T, UserSegmentUpdateArgs>
    ): CheckSelect<T, Prisma__UserSegmentClient<UserSegment>, Prisma__UserSegmentClient<UserSegmentGetPayload<T>>>

    /**
     * Delete zero or more UserSegments.
     * @param {UserSegmentDeleteManyArgs} args - Arguments to filter UserSegments to delete.
     * @example
     * // Delete a few UserSegments
     * const { count } = await prisma.userSegment.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
    **/
    deleteMany<T extends UserSegmentDeleteManyArgs>(
      args?: SelectSubset<T, UserSegmentDeleteManyArgs>
    ): PrismaPromise<BatchPayload>

    /**
     * Update zero or more UserSegments.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserSegmentUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many UserSegments
     * const userSegment = await prisma.userSegment.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    updateMany<T extends UserSegmentUpdateManyArgs>(
      args: SelectSubset<T, UserSegmentUpdateManyArgs>
    ): PrismaPromise<BatchPayload>

    /**
     * Create or update one UserSegment.
     * @param {UserSegmentUpsertArgs} args - Arguments to update or create a UserSegment.
     * @example
     * // Update or create a UserSegment
     * const userSegment = await prisma.userSegment.upsert({
     *   create: {
     *     // ... data to create a UserSegment
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the UserSegment we want to update
     *   }
     * })
    **/
    upsert<T extends UserSegmentUpsertArgs>(
      args: SelectSubset<T, UserSegmentUpsertArgs>
    ): CheckSelect<T, Prisma__UserSegmentClient<UserSegment>, Prisma__UserSegmentClient<UserSegmentGetPayload<T>>>

    /**
     * Count the number of UserSegments.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserSegmentCountArgs} args - Arguments to filter UserSegments to count.
     * @example
     * // Count the number of UserSegments
     * const count = await prisma.userSegment.count({
     *   where: {
     *     // ... the filter for the UserSegments we want to count
     *   }
     * })
    **/
    count<T extends UserSegmentCountArgs>(
      args?: Subset<T, UserSegmentCountArgs>,
    ): PrismaPromise<
      T extends _Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], UserSegmentCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a UserSegment.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserSegmentAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends UserSegmentAggregateArgs>(args: Subset<T, UserSegmentAggregateArgs>): PrismaPromise<GetUserSegmentAggregateType<T>>

    /**
     * Group by UserSegment.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserSegmentGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends UserSegmentGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: UserSegmentGroupByArgs['orderBy'] }
        : { orderBy?: UserSegmentGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends TupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, UserSegmentGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetUserSegmentGroupByPayload<T> : PrismaPromise<InputErrors>
  }

  /**
   * The delegate class that acts as a "Promise-like" for UserSegment.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export class Prisma__UserSegmentClient<T> implements PrismaPromise<T> {
    [prisma]: true;
    private readonly _dmmf;
    private readonly _fetcher;
    private readonly _queryType;
    private readonly _rootField;
    private readonly _clientMethod;
    private readonly _args;
    private readonly _dataPath;
    private readonly _errorFormat;
    private readonly _measurePerformance?;
    private _isList;
    private _callsite;
    private _requestPromise?;
    constructor(_dmmf: runtime.DMMFClass, _fetcher: PrismaClientFetcher, _queryType: 'query' | 'mutation', _rootField: string, _clientMethod: string, _args: any, _dataPath: string[], _errorFormat: ErrorFormat, _measurePerformance?: boolean | undefined, _isList?: boolean);
    readonly [Symbol.toStringTag]: 'PrismaClientPromise';

    all<T extends ServiceArgs = {}>(args?: Subset<T, ServiceArgs>): CheckSelect<T, Prisma__ServiceClient<Service | null >, Prisma__ServiceClient<ServiceGetPayload<T> | null >>;

    byID<T extends ServiceArgs = {}>(args?: Subset<T, ServiceArgs>): CheckSelect<T, Prisma__ServiceClient<Service | null >, Prisma__ServiceClient<ServiceGetPayload<T> | null >>;

    byPhone<T extends ServiceArgs = {}>(args?: Subset<T, ServiceArgs>): CheckSelect<T, Prisma__ServiceClient<Service | null >, Prisma__ServiceClient<ServiceGetPayload<T> | null >>;

    bots<T extends BotFindManyArgs = {}>(args?: Subset<T, BotFindManyArgs>): CheckSelect<T, PrismaPromise<Array<Bot>>, PrismaPromise<Array<BotGetPayload<T>>>>;

    private get _document();
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): Promise<TResult1 | TResult2>;
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): Promise<T | TResult>;
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): Promise<T>;
  }

  // Custom InputTypes

  /**
   * UserSegment findUnique
   */
  export type UserSegmentFindUniqueArgs = {
    /**
     * Select specific fields to fetch from the UserSegment
     * 
    **/
    select?: UserSegmentSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: UserSegmentInclude | null
    /**
     * Throw an Error if a UserSegment can't be found
     * 
    **/
    rejectOnNotFound?: RejectOnNotFound
    /**
     * Filter, which UserSegment to fetch.
     * 
    **/
    where: UserSegmentWhereUniqueInput
  }


  /**
   * UserSegment findFirst
   */
  export type UserSegmentFindFirstArgs = {
    /**
     * Select specific fields to fetch from the UserSegment
     * 
    **/
    select?: UserSegmentSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: UserSegmentInclude | null
    /**
     * Throw an Error if a UserSegment can't be found
     * 
    **/
    rejectOnNotFound?: RejectOnNotFound
    /**
     * Filter, which UserSegment to fetch.
     * 
    **/
    where?: UserSegmentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of UserSegments to fetch.
     * 
    **/
    orderBy?: Enumerable<UserSegmentOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for UserSegments.
     * 
    **/
    cursor?: UserSegmentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` UserSegments from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` UserSegments.
     * 
    **/
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of UserSegments.
     * 
    **/
    distinct?: Enumerable<UserSegmentScalarFieldEnum>
  }


  /**
   * UserSegment findMany
   */
  export type UserSegmentFindManyArgs = {
    /**
     * Select specific fields to fetch from the UserSegment
     * 
    **/
    select?: UserSegmentSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: UserSegmentInclude | null
    /**
     * Filter, which UserSegments to fetch.
     * 
    **/
    where?: UserSegmentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of UserSegments to fetch.
     * 
    **/
    orderBy?: Enumerable<UserSegmentOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing UserSegments.
     * 
    **/
    cursor?: UserSegmentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` UserSegments from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` UserSegments.
     * 
    **/
    skip?: number
    distinct?: Enumerable<UserSegmentScalarFieldEnum>
  }


  /**
   * UserSegment create
   */
  export type UserSegmentCreateArgs = {
    /**
     * Select specific fields to fetch from the UserSegment
     * 
    **/
    select?: UserSegmentSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: UserSegmentInclude | null
    /**
     * The data needed to create a UserSegment.
     * 
    **/
    data: XOR<UserSegmentCreateInput, UserSegmentUncheckedCreateInput>
  }


  /**
   * UserSegment createMany
   */
  export type UserSegmentCreateManyArgs = {
    /**
     * The data used to create many UserSegments.
     * 
    **/
    data: Enumerable<UserSegmentCreateManyInput>
    skipDuplicates?: boolean
  }


  /**
   * UserSegment update
   */
  export type UserSegmentUpdateArgs = {
    /**
     * Select specific fields to fetch from the UserSegment
     * 
    **/
    select?: UserSegmentSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: UserSegmentInclude | null
    /**
     * The data needed to update a UserSegment.
     * 
    **/
    data: XOR<UserSegmentUpdateInput, UserSegmentUncheckedUpdateInput>
    /**
     * Choose, which UserSegment to update.
     * 
    **/
    where: UserSegmentWhereUniqueInput
  }


  /**
   * UserSegment updateMany
   */
  export type UserSegmentUpdateManyArgs = {
    /**
     * The data used to update UserSegments.
     * 
    **/
    data: XOR<UserSegmentUpdateManyMutationInput, UserSegmentUncheckedUpdateManyInput>
    /**
     * Filter which UserSegments to update
     * 
    **/
    where?: UserSegmentWhereInput
  }


  /**
   * UserSegment upsert
   */
  export type UserSegmentUpsertArgs = {
    /**
     * Select specific fields to fetch from the UserSegment
     * 
    **/
    select?: UserSegmentSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: UserSegmentInclude | null
    /**
     * The filter to search for the UserSegment to update in case it exists.
     * 
    **/
    where: UserSegmentWhereUniqueInput
    /**
     * In case the UserSegment found by the `where` argument doesn't exist, create a new UserSegment with this data.
     * 
    **/
    create: XOR<UserSegmentCreateInput, UserSegmentUncheckedCreateInput>
    /**
     * In case the UserSegment was found with the provided `where` argument, update it with this data.
     * 
    **/
    update: XOR<UserSegmentUpdateInput, UserSegmentUncheckedUpdateInput>
  }


  /**
   * UserSegment delete
   */
  export type UserSegmentDeleteArgs = {
    /**
     * Select specific fields to fetch from the UserSegment
     * 
    **/
    select?: UserSegmentSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: UserSegmentInclude | null
    /**
     * Filter which UserSegment to delete.
     * 
    **/
    where: UserSegmentWhereUniqueInput
  }


  /**
   * UserSegment deleteMany
   */
  export type UserSegmentDeleteManyArgs = {
    /**
     * Filter which UserSegments to delete
     * 
    **/
    where?: UserSegmentWhereInput
  }


  /**
   * UserSegment without action
   */
  export type UserSegmentArgs = {
    /**
     * Select specific fields to fetch from the UserSegment
     * 
    **/
    select?: UserSegmentSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: UserSegmentInclude | null
  }



  /**
   * Model ConversationLogic
   */


  export type AggregateConversationLogic = {
    _count: ConversationLogicCountAggregateOutputType | null
    _min: ConversationLogicMinAggregateOutputType | null
    _max: ConversationLogicMaxAggregateOutputType | null
  }

  export type ConversationLogicMinAggregateOutputType = {
    id: string | null
    name: string | null
    createdAt: Date | null
    updatedAt: Date | null
    description: string | null
    adapterId: string | null
  }

  export type ConversationLogicMaxAggregateOutputType = {
    id: string | null
    name: string | null
    createdAt: Date | null
    updatedAt: Date | null
    description: string | null
    adapterId: string | null
  }

  export type ConversationLogicCountAggregateOutputType = {
    id: number
    name: number
    createdAt: number
    updatedAt: number
    description: number
    adapterId: number
    _all: number
  }


  export type ConversationLogicMinAggregateInputType = {
    id?: true
    name?: true
    createdAt?: true
    updatedAt?: true
    description?: true
    adapterId?: true
  }

  export type ConversationLogicMaxAggregateInputType = {
    id?: true
    name?: true
    createdAt?: true
    updatedAt?: true
    description?: true
    adapterId?: true
  }

  export type ConversationLogicCountAggregateInputType = {
    id?: true
    name?: true
    createdAt?: true
    updatedAt?: true
    description?: true
    adapterId?: true
    _all?: true
  }

  export type ConversationLogicAggregateArgs = {
    /**
     * Filter which ConversationLogic to aggregate.
     * 
    **/
    where?: ConversationLogicWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ConversationLogics to fetch.
     * 
    **/
    orderBy?: Enumerable<ConversationLogicOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     * 
    **/
    cursor?: ConversationLogicWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ConversationLogics from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ConversationLogics.
     * 
    **/
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned ConversationLogics
    **/
    _count?: true | ConversationLogicCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ConversationLogicMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ConversationLogicMaxAggregateInputType
  }

  export type GetConversationLogicAggregateType<T extends ConversationLogicAggregateArgs> = {
        [P in keyof T & keyof AggregateConversationLogic]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateConversationLogic[P]>
      : GetScalarType<T[P], AggregateConversationLogic[P]>
  }




  export type ConversationLogicGroupByArgs = {
    where?: ConversationLogicWhereInput
    orderBy?: Enumerable<ConversationLogicOrderByWithAggregationInput>
    by: Array<ConversationLogicScalarFieldEnum>
    having?: ConversationLogicScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ConversationLogicCountAggregateInputType | true
    _min?: ConversationLogicMinAggregateInputType
    _max?: ConversationLogicMaxAggregateInputType
  }


  export type ConversationLogicGroupByOutputType = {
    id: string
    name: string
    createdAt: Date
    updatedAt: Date
    description: string | null
    adapterId: string
    _count: ConversationLogicCountAggregateOutputType | null
    _min: ConversationLogicMinAggregateOutputType | null
    _max: ConversationLogicMaxAggregateOutputType | null
  }

  type GetConversationLogicGroupByPayload<T extends ConversationLogicGroupByArgs> = PrismaPromise<
    Array<
      PickArray<ConversationLogicGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ConversationLogicGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ConversationLogicGroupByOutputType[P]>
            : GetScalarType<T[P], ConversationLogicGroupByOutputType[P]>
        }
      >
    >


  export type ConversationLogicSelect = {
    id?: boolean
    name?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    description?: boolean
    adapter?: boolean | AdapterArgs
    adapterId?: boolean
    bots?: boolean | BotFindManyArgs
    transformers?: boolean | TransformerConfigFindManyArgs
    _count?: boolean | ConversationLogicCountOutputTypeArgs
  }

  export type ConversationLogicInclude = {
    adapter?: boolean | AdapterArgs
    bots?: boolean | BotFindManyArgs
    transformers?: boolean | TransformerConfigFindManyArgs
    _count?: boolean | ConversationLogicCountOutputTypeArgs
  }

  export type ConversationLogicGetPayload<
    S extends boolean | null | undefined | ConversationLogicArgs,
    U = keyof S
      > = S extends true
        ? ConversationLogic
    : S extends undefined
    ? never
    : S extends ConversationLogicArgs | ConversationLogicFindManyArgs
    ?'include' extends U
    ? ConversationLogic  & {
    [P in TrueKeys<S['include']>]:
        P extends 'adapter' ? AdapterGetPayload<S['include'][P]> :
        P extends 'bots' ? Array < BotGetPayload<S['include'][P]>>  :
        P extends 'transformers' ? Array < TransformerConfigGetPayload<S['include'][P]>>  :
        P extends '_count' ? ConversationLogicCountOutputTypeGetPayload<S['include'][P]> :  never
  } 
    : 'select' extends U
    ? {
    [P in TrueKeys<S['select']>]:
        P extends 'adapter' ? AdapterGetPayload<S['select'][P]> :
        P extends 'bots' ? Array < BotGetPayload<S['select'][P]>>  :
        P extends 'transformers' ? Array < TransformerConfigGetPayload<S['select'][P]>>  :
        P extends '_count' ? ConversationLogicCountOutputTypeGetPayload<S['select'][P]> :  P extends keyof ConversationLogic ? ConversationLogic[P] : never
  } 
    : ConversationLogic
  : ConversationLogic


  type ConversationLogicCountArgs = Merge<
    Omit<ConversationLogicFindManyArgs, 'select' | 'include'> & {
      select?: ConversationLogicCountAggregateInputType | true
    }
  >

  export interface ConversationLogicDelegate<GlobalRejectSettings> {
    /**
     * Find zero or one ConversationLogic that matches the filter.
     * @param {ConversationLogicFindUniqueArgs} args - Arguments to find a ConversationLogic
     * @example
     * // Get one ConversationLogic
     * const conversationLogic = await prisma.conversationLogic.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUnique<T extends ConversationLogicFindUniqueArgs,  LocalRejectSettings = T["rejectOnNotFound"] extends RejectOnNotFound ? T['rejectOnNotFound'] : undefined>(
      args: SelectSubset<T, ConversationLogicFindUniqueArgs>
    ): HasReject<GlobalRejectSettings, LocalRejectSettings, 'findUnique', 'ConversationLogic'> extends True ? CheckSelect<T, Prisma__ConversationLogicClient<ConversationLogic>, Prisma__ConversationLogicClient<ConversationLogicGetPayload<T>>> : CheckSelect<T, Prisma__ConversationLogicClient<ConversationLogic | null >, Prisma__ConversationLogicClient<ConversationLogicGetPayload<T> | null >>

    /**
     * Find the first ConversationLogic that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ConversationLogicFindFirstArgs} args - Arguments to find a ConversationLogic
     * @example
     * // Get one ConversationLogic
     * const conversationLogic = await prisma.conversationLogic.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirst<T extends ConversationLogicFindFirstArgs,  LocalRejectSettings = T["rejectOnNotFound"] extends RejectOnNotFound ? T['rejectOnNotFound'] : undefined>(
      args?: SelectSubset<T, ConversationLogicFindFirstArgs>
    ): HasReject<GlobalRejectSettings, LocalRejectSettings, 'findFirst', 'ConversationLogic'> extends True ? CheckSelect<T, Prisma__ConversationLogicClient<ConversationLogic>, Prisma__ConversationLogicClient<ConversationLogicGetPayload<T>>> : CheckSelect<T, Prisma__ConversationLogicClient<ConversationLogic | null >, Prisma__ConversationLogicClient<ConversationLogicGetPayload<T> | null >>

    /**
     * Find zero or more ConversationLogics that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ConversationLogicFindManyArgs=} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all ConversationLogics
     * const conversationLogics = await prisma.conversationLogic.findMany()
     * 
     * // Get first 10 ConversationLogics
     * const conversationLogics = await prisma.conversationLogic.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const conversationLogicWithIdOnly = await prisma.conversationLogic.findMany({ select: { id: true } })
     * 
    **/
    findMany<T extends ConversationLogicFindManyArgs>(
      args?: SelectSubset<T, ConversationLogicFindManyArgs>
    ): CheckSelect<T, PrismaPromise<Array<ConversationLogic>>, PrismaPromise<Array<ConversationLogicGetPayload<T>>>>

    /**
     * Create a ConversationLogic.
     * @param {ConversationLogicCreateArgs} args - Arguments to create a ConversationLogic.
     * @example
     * // Create one ConversationLogic
     * const ConversationLogic = await prisma.conversationLogic.create({
     *   data: {
     *     // ... data to create a ConversationLogic
     *   }
     * })
     * 
    **/
    create<T extends ConversationLogicCreateArgs>(
      args: SelectSubset<T, ConversationLogicCreateArgs>
    ): CheckSelect<T, Prisma__ConversationLogicClient<ConversationLogic>, Prisma__ConversationLogicClient<ConversationLogicGetPayload<T>>>

    /**
     * Create many ConversationLogics.
     *     @param {ConversationLogicCreateManyArgs} args - Arguments to create many ConversationLogics.
     *     @example
     *     // Create many ConversationLogics
     *     const conversationLogic = await prisma.conversationLogic.createMany({
     *       data: {
     *         // ... provide data here
     *       }
     *     })
     *     
    **/
    createMany<T extends ConversationLogicCreateManyArgs>(
      args?: SelectSubset<T, ConversationLogicCreateManyArgs>
    ): PrismaPromise<BatchPayload>

    /**
     * Delete a ConversationLogic.
     * @param {ConversationLogicDeleteArgs} args - Arguments to delete one ConversationLogic.
     * @example
     * // Delete one ConversationLogic
     * const ConversationLogic = await prisma.conversationLogic.delete({
     *   where: {
     *     // ... filter to delete one ConversationLogic
     *   }
     * })
     * 
    **/
    delete<T extends ConversationLogicDeleteArgs>(
      args: SelectSubset<T, ConversationLogicDeleteArgs>
    ): CheckSelect<T, Prisma__ConversationLogicClient<ConversationLogic>, Prisma__ConversationLogicClient<ConversationLogicGetPayload<T>>>

    /**
     * Update one ConversationLogic.
     * @param {ConversationLogicUpdateArgs} args - Arguments to update one ConversationLogic.
     * @example
     * // Update one ConversationLogic
     * const conversationLogic = await prisma.conversationLogic.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    update<T extends ConversationLogicUpdateArgs>(
      args: SelectSubset<T, ConversationLogicUpdateArgs>
    ): CheckSelect<T, Prisma__ConversationLogicClient<ConversationLogic>, Prisma__ConversationLogicClient<ConversationLogicGetPayload<T>>>

    /**
     * Delete zero or more ConversationLogics.
     * @param {ConversationLogicDeleteManyArgs} args - Arguments to filter ConversationLogics to delete.
     * @example
     * // Delete a few ConversationLogics
     * const { count } = await prisma.conversationLogic.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
    **/
    deleteMany<T extends ConversationLogicDeleteManyArgs>(
      args?: SelectSubset<T, ConversationLogicDeleteManyArgs>
    ): PrismaPromise<BatchPayload>

    /**
     * Update zero or more ConversationLogics.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ConversationLogicUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many ConversationLogics
     * const conversationLogic = await prisma.conversationLogic.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    updateMany<T extends ConversationLogicUpdateManyArgs>(
      args: SelectSubset<T, ConversationLogicUpdateManyArgs>
    ): PrismaPromise<BatchPayload>

    /**
     * Create or update one ConversationLogic.
     * @param {ConversationLogicUpsertArgs} args - Arguments to update or create a ConversationLogic.
     * @example
     * // Update or create a ConversationLogic
     * const conversationLogic = await prisma.conversationLogic.upsert({
     *   create: {
     *     // ... data to create a ConversationLogic
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the ConversationLogic we want to update
     *   }
     * })
    **/
    upsert<T extends ConversationLogicUpsertArgs>(
      args: SelectSubset<T, ConversationLogicUpsertArgs>
    ): CheckSelect<T, Prisma__ConversationLogicClient<ConversationLogic>, Prisma__ConversationLogicClient<ConversationLogicGetPayload<T>>>

    /**
     * Count the number of ConversationLogics.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ConversationLogicCountArgs} args - Arguments to filter ConversationLogics to count.
     * @example
     * // Count the number of ConversationLogics
     * const count = await prisma.conversationLogic.count({
     *   where: {
     *     // ... the filter for the ConversationLogics we want to count
     *   }
     * })
    **/
    count<T extends ConversationLogicCountArgs>(
      args?: Subset<T, ConversationLogicCountArgs>,
    ): PrismaPromise<
      T extends _Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ConversationLogicCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a ConversationLogic.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ConversationLogicAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends ConversationLogicAggregateArgs>(args: Subset<T, ConversationLogicAggregateArgs>): PrismaPromise<GetConversationLogicAggregateType<T>>

    /**
     * Group by ConversationLogic.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ConversationLogicGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends ConversationLogicGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ConversationLogicGroupByArgs['orderBy'] }
        : { orderBy?: ConversationLogicGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends TupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, ConversationLogicGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetConversationLogicGroupByPayload<T> : PrismaPromise<InputErrors>
  }

  /**
   * The delegate class that acts as a "Promise-like" for ConversationLogic.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export class Prisma__ConversationLogicClient<T> implements PrismaPromise<T> {
    [prisma]: true;
    private readonly _dmmf;
    private readonly _fetcher;
    private readonly _queryType;
    private readonly _rootField;
    private readonly _clientMethod;
    private readonly _args;
    private readonly _dataPath;
    private readonly _errorFormat;
    private readonly _measurePerformance?;
    private _isList;
    private _callsite;
    private _requestPromise?;
    constructor(_dmmf: runtime.DMMFClass, _fetcher: PrismaClientFetcher, _queryType: 'query' | 'mutation', _rootField: string, _clientMethod: string, _args: any, _dataPath: string[], _errorFormat: ErrorFormat, _measurePerformance?: boolean | undefined, _isList?: boolean);
    readonly [Symbol.toStringTag]: 'PrismaClientPromise';

    adapter<T extends AdapterArgs = {}>(args?: Subset<T, AdapterArgs>): CheckSelect<T, Prisma__AdapterClient<Adapter | null >, Prisma__AdapterClient<AdapterGetPayload<T> | null >>;

    bots<T extends BotFindManyArgs = {}>(args?: Subset<T, BotFindManyArgs>): CheckSelect<T, PrismaPromise<Array<Bot>>, PrismaPromise<Array<BotGetPayload<T>>>>;

    transformers<T extends TransformerConfigFindManyArgs = {}>(args?: Subset<T, TransformerConfigFindManyArgs>): CheckSelect<T, PrismaPromise<Array<TransformerConfig>>, PrismaPromise<Array<TransformerConfigGetPayload<T>>>>;

    private get _document();
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): Promise<TResult1 | TResult2>;
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): Promise<T | TResult>;
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): Promise<T>;
  }

  // Custom InputTypes

  /**
   * ConversationLogic findUnique
   */
  export type ConversationLogicFindUniqueArgs = {
    /**
     * Select specific fields to fetch from the ConversationLogic
     * 
    **/
    select?: ConversationLogicSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: ConversationLogicInclude | null
    /**
     * Throw an Error if a ConversationLogic can't be found
     * 
    **/
    rejectOnNotFound?: RejectOnNotFound
    /**
     * Filter, which ConversationLogic to fetch.
     * 
    **/
    where: ConversationLogicWhereUniqueInput
  }


  /**
   * ConversationLogic findFirst
   */
  export type ConversationLogicFindFirstArgs = {
    /**
     * Select specific fields to fetch from the ConversationLogic
     * 
    **/
    select?: ConversationLogicSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: ConversationLogicInclude | null
    /**
     * Throw an Error if a ConversationLogic can't be found
     * 
    **/
    rejectOnNotFound?: RejectOnNotFound
    /**
     * Filter, which ConversationLogic to fetch.
     * 
    **/
    where?: ConversationLogicWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ConversationLogics to fetch.
     * 
    **/
    orderBy?: Enumerable<ConversationLogicOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ConversationLogics.
     * 
    **/
    cursor?: ConversationLogicWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ConversationLogics from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ConversationLogics.
     * 
    **/
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ConversationLogics.
     * 
    **/
    distinct?: Enumerable<ConversationLogicScalarFieldEnum>
  }


  /**
   * ConversationLogic findMany
   */
  export type ConversationLogicFindManyArgs = {
    /**
     * Select specific fields to fetch from the ConversationLogic
     * 
    **/
    select?: ConversationLogicSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: ConversationLogicInclude | null
    /**
     * Filter, which ConversationLogics to fetch.
     * 
    **/
    where?: ConversationLogicWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ConversationLogics to fetch.
     * 
    **/
    orderBy?: Enumerable<ConversationLogicOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing ConversationLogics.
     * 
    **/
    cursor?: ConversationLogicWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ConversationLogics from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ConversationLogics.
     * 
    **/
    skip?: number
    distinct?: Enumerable<ConversationLogicScalarFieldEnum>
  }


  /**
   * ConversationLogic create
   */
  export type ConversationLogicCreateArgs = {
    /**
     * Select specific fields to fetch from the ConversationLogic
     * 
    **/
    select?: ConversationLogicSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: ConversationLogicInclude | null
    /**
     * The data needed to create a ConversationLogic.
     * 
    **/
    data: XOR<ConversationLogicCreateInput, ConversationLogicUncheckedCreateInput>
  }


  /**
   * ConversationLogic createMany
   */
  export type ConversationLogicCreateManyArgs = {
    /**
     * The data used to create many ConversationLogics.
     * 
    **/
    data: Enumerable<ConversationLogicCreateManyInput>
    skipDuplicates?: boolean
  }


  /**
   * ConversationLogic update
   */
  export type ConversationLogicUpdateArgs = {
    /**
     * Select specific fields to fetch from the ConversationLogic
     * 
    **/
    select?: ConversationLogicSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: ConversationLogicInclude | null
    /**
     * The data needed to update a ConversationLogic.
     * 
    **/
    data: XOR<ConversationLogicUpdateInput, ConversationLogicUncheckedUpdateInput>
    /**
     * Choose, which ConversationLogic to update.
     * 
    **/
    where: ConversationLogicWhereUniqueInput
  }


  /**
   * ConversationLogic updateMany
   */
  export type ConversationLogicUpdateManyArgs = {
    /**
     * The data used to update ConversationLogics.
     * 
    **/
    data: XOR<ConversationLogicUpdateManyMutationInput, ConversationLogicUncheckedUpdateManyInput>
    /**
     * Filter which ConversationLogics to update
     * 
    **/
    where?: ConversationLogicWhereInput
  }


  /**
   * ConversationLogic upsert
   */
  export type ConversationLogicUpsertArgs = {
    /**
     * Select specific fields to fetch from the ConversationLogic
     * 
    **/
    select?: ConversationLogicSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: ConversationLogicInclude | null
    /**
     * The filter to search for the ConversationLogic to update in case it exists.
     * 
    **/
    where: ConversationLogicWhereUniqueInput
    /**
     * In case the ConversationLogic found by the `where` argument doesn't exist, create a new ConversationLogic with this data.
     * 
    **/
    create: XOR<ConversationLogicCreateInput, ConversationLogicUncheckedCreateInput>
    /**
     * In case the ConversationLogic was found with the provided `where` argument, update it with this data.
     * 
    **/
    update: XOR<ConversationLogicUpdateInput, ConversationLogicUncheckedUpdateInput>
  }


  /**
   * ConversationLogic delete
   */
  export type ConversationLogicDeleteArgs = {
    /**
     * Select specific fields to fetch from the ConversationLogic
     * 
    **/
    select?: ConversationLogicSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: ConversationLogicInclude | null
    /**
     * Filter which ConversationLogic to delete.
     * 
    **/
    where: ConversationLogicWhereUniqueInput
  }


  /**
   * ConversationLogic deleteMany
   */
  export type ConversationLogicDeleteManyArgs = {
    /**
     * Filter which ConversationLogics to delete
     * 
    **/
    where?: ConversationLogicWhereInput
  }


  /**
   * ConversationLogic without action
   */
  export type ConversationLogicArgs = {
    /**
     * Select specific fields to fetch from the ConversationLogic
     * 
    **/
    select?: ConversationLogicSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: ConversationLogicInclude | null
  }



  /**
   * Enums
   */

  // Based on
  // https://github.com/microsoft/TypeScript/issues/3192#issuecomment-261720275

  export const AdapterScalarFieldEnum: {
    id: 'id',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
    channel: 'channel',
    provider: 'provider',
    config: 'config',
    name: 'name'
  };

  export type AdapterScalarFieldEnum = (typeof AdapterScalarFieldEnum)[keyof typeof AdapterScalarFieldEnum]


  export const BoardScalarFieldEnum: {
    id: 'id',
    name: 'name'
  };

  export type BoardScalarFieldEnum = (typeof BoardScalarFieldEnum)[keyof typeof BoardScalarFieldEnum]


  export const ServiceScalarFieldEnum: {
    id: 'id',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
    type: 'type',
    config: 'config',
    name: 'name'
  };

  export type ServiceScalarFieldEnum = (typeof ServiceScalarFieldEnum)[keyof typeof ServiceScalarFieldEnum]


  export const TransformerScalarFieldEnum: {
    id: 'id',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
    name: 'name',
    tags: 'tags',
    config: 'config',
    serviceId: 'serviceId'
  };

  export type TransformerScalarFieldEnum = (typeof TransformerScalarFieldEnum)[keyof typeof TransformerScalarFieldEnum]


  export const TransformerConfigScalarFieldEnum: {
    id: 'id',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
    meta: 'meta',
    transformerId: 'transformerId',
    conversationLogicId: 'conversationLogicId'
  };

  export type TransformerConfigScalarFieldEnum = (typeof TransformerConfigScalarFieldEnum)[keyof typeof TransformerConfigScalarFieldEnum]


  export const BotScalarFieldEnum: {
    id: 'id',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
    name: 'name',
    startingMessage: 'startingMessage',
    ownerID: 'ownerID',
    ownerOrgID: 'ownerOrgID',
    purpose: 'purpose',
    description: 'description',
    startDate: 'startDate',
    endDate: 'endDate'
  };

  export type BotScalarFieldEnum = (typeof BotScalarFieldEnum)[keyof typeof BotScalarFieldEnum]


  export const UserSegmentScalarFieldEnum: {
    id: 'id',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
    name: 'name',
    description: 'description',
    count: 'count',
    category: 'category',
    allServiceID: 'allServiceID',
    byPhoneServiceID: 'byPhoneServiceID',
    byIDServiceID: 'byIDServiceID',
    botId: 'botId'
  };

  export type UserSegmentScalarFieldEnum = (typeof UserSegmentScalarFieldEnum)[keyof typeof UserSegmentScalarFieldEnum]


  export const ConversationLogicScalarFieldEnum: {
    id: 'id',
    name: 'name',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
    description: 'description',
    adapterId: 'adapterId'
  };

  export type ConversationLogicScalarFieldEnum = (typeof ConversationLogicScalarFieldEnum)[keyof typeof ConversationLogicScalarFieldEnum]


  export const SortOrder: {
    asc: 'asc',
    desc: 'desc'
  };

  export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]


  export const JsonNullValueInput: {
    JsonNull: 'JsonNull'
  };

  export type JsonNullValueInput = (typeof JsonNullValueInput)[keyof typeof JsonNullValueInput]


  export const NullableJsonNullValueInput: {
    DbNull: 'DbNull',
    JsonNull: 'JsonNull'
  };

  export type NullableJsonNullValueInput = (typeof NullableJsonNullValueInput)[keyof typeof NullableJsonNullValueInput]


  export const QueryMode: {
    default: 'default',
    insensitive: 'insensitive'
  };

  export type QueryMode = (typeof QueryMode)[keyof typeof QueryMode]


  export const JsonNullValueFilter: {
    DbNull: 'DbNull',
    JsonNull: 'JsonNull',
    AnyNull: 'AnyNull'
  };

  export type JsonNullValueFilter = (typeof JsonNullValueFilter)[keyof typeof JsonNullValueFilter]


  /**
   * Deep Input Types
   */


  export type AdapterWhereInput = {
    AND?: Enumerable<AdapterWhereInput>
    OR?: Enumerable<AdapterWhereInput>
    NOT?: Enumerable<AdapterWhereInput>
    id?: StringFilter | string
    createdAt?: DateTimeFilter | Date | string
    updatedAt?: DateTimeFilter | Date | string
    channel?: StringFilter | string
    provider?: StringFilter | string
    config?: JsonFilter
    name?: StringFilter | string
    ConversationLogic?: ConversationLogicListRelationFilter
  }

  export type AdapterOrderByWithRelationInput = {
    id?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    channel?: SortOrder
    provider?: SortOrder
    config?: SortOrder
    name?: SortOrder
    ConversationLogic?: ConversationLogicOrderByRelationAggregateInput
  }

  export type AdapterWhereUniqueInput = {
    id?: string
    name?: string
  }

  export type AdapterOrderByWithAggregationInput = {
    id?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    channel?: SortOrder
    provider?: SortOrder
    config?: SortOrder
    name?: SortOrder
    _count?: AdapterCountOrderByAggregateInput
    _max?: AdapterMaxOrderByAggregateInput
    _min?: AdapterMinOrderByAggregateInput
  }

  export type AdapterScalarWhereWithAggregatesInput = {
    AND?: Enumerable<AdapterScalarWhereWithAggregatesInput>
    OR?: Enumerable<AdapterScalarWhereWithAggregatesInput>
    NOT?: Enumerable<AdapterScalarWhereWithAggregatesInput>
    id?: StringWithAggregatesFilter | string
    createdAt?: DateTimeWithAggregatesFilter | Date | string
    updatedAt?: DateTimeWithAggregatesFilter | Date | string
    channel?: StringWithAggregatesFilter | string
    provider?: StringWithAggregatesFilter | string
    config?: JsonWithAggregatesFilter
    name?: StringWithAggregatesFilter | string
  }

  export type BoardWhereInput = {
    AND?: Enumerable<BoardWhereInput>
    OR?: Enumerable<BoardWhereInput>
    NOT?: Enumerable<BoardWhereInput>
    id?: IntFilter | number
    name?: StringFilter | string
  }

  export type BoardOrderByWithRelationInput = {
    id?: SortOrder
    name?: SortOrder
  }

  export type BoardWhereUniqueInput = {
    id?: number
  }

  export type BoardOrderByWithAggregationInput = {
    id?: SortOrder
    name?: SortOrder
    _count?: BoardCountOrderByAggregateInput
    _avg?: BoardAvgOrderByAggregateInput
    _max?: BoardMaxOrderByAggregateInput
    _min?: BoardMinOrderByAggregateInput
    _sum?: BoardSumOrderByAggregateInput
  }

  export type BoardScalarWhereWithAggregatesInput = {
    AND?: Enumerable<BoardScalarWhereWithAggregatesInput>
    OR?: Enumerable<BoardScalarWhereWithAggregatesInput>
    NOT?: Enumerable<BoardScalarWhereWithAggregatesInput>
    id?: IntWithAggregatesFilter | number
    name?: StringWithAggregatesFilter | string
  }

  export type ServiceWhereInput = {
    AND?: Enumerable<ServiceWhereInput>
    OR?: Enumerable<ServiceWhereInput>
    NOT?: Enumerable<ServiceWhereInput>
    id?: StringFilter | string
    createdAt?: DateTimeFilter | Date | string
    updatedAt?: DateTimeFilter | Date | string
    type?: StringFilter | string
    config?: JsonNullableFilter
    name?: StringNullableFilter | string | null
    Transformer?: TransformerListRelationFilter
    UserSegmentByID?: UserSegmentListRelationFilter
    UserSegmentByPhone?: UserSegmentListRelationFilter
    UserSegmentAll?: UserSegmentListRelationFilter
  }

  export type ServiceOrderByWithRelationInput = {
    id?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    type?: SortOrder
    config?: SortOrder
    name?: SortOrder
    Transformer?: TransformerOrderByRelationAggregateInput
    UserSegmentByID?: UserSegmentOrderByRelationAggregateInput
    UserSegmentByPhone?: UserSegmentOrderByRelationAggregateInput
    UserSegmentAll?: UserSegmentOrderByRelationAggregateInput
  }

  export type ServiceWhereUniqueInput = {
    id?: string
  }

  export type ServiceOrderByWithAggregationInput = {
    id?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    type?: SortOrder
    config?: SortOrder
    name?: SortOrder
    _count?: ServiceCountOrderByAggregateInput
    _max?: ServiceMaxOrderByAggregateInput
    _min?: ServiceMinOrderByAggregateInput
  }

  export type ServiceScalarWhereWithAggregatesInput = {
    AND?: Enumerable<ServiceScalarWhereWithAggregatesInput>
    OR?: Enumerable<ServiceScalarWhereWithAggregatesInput>
    NOT?: Enumerable<ServiceScalarWhereWithAggregatesInput>
    id?: StringWithAggregatesFilter | string
    createdAt?: DateTimeWithAggregatesFilter | Date | string
    updatedAt?: DateTimeWithAggregatesFilter | Date | string
    type?: StringWithAggregatesFilter | string
    config?: JsonNullableWithAggregatesFilter
    name?: StringNullableWithAggregatesFilter | string | null
  }

  export type TransformerWhereInput = {
    AND?: Enumerable<TransformerWhereInput>
    OR?: Enumerable<TransformerWhereInput>
    NOT?: Enumerable<TransformerWhereInput>
    id?: StringFilter | string
    createdAt?: DateTimeFilter | Date | string
    updatedAt?: DateTimeFilter | Date | string
    name?: StringFilter | string
    tags?: StringNullableListFilter
    config?: JsonFilter
    service?: XOR<ServiceRelationFilter, ServiceWhereInput>
    serviceId?: StringFilter | string
    TranformerConfig?: TransformerConfigListRelationFilter
  }

  export type TransformerOrderByWithRelationInput = {
    id?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    name?: SortOrder
    tags?: SortOrder
    config?: SortOrder
    service?: ServiceOrderByWithRelationInput
    serviceId?: SortOrder
    TranformerConfig?: TransformerConfigOrderByRelationAggregateInput
  }

  export type TransformerWhereUniqueInput = {
    id?: string
  }

  export type TransformerOrderByWithAggregationInput = {
    id?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    name?: SortOrder
    tags?: SortOrder
    config?: SortOrder
    serviceId?: SortOrder
    _count?: TransformerCountOrderByAggregateInput
    _max?: TransformerMaxOrderByAggregateInput
    _min?: TransformerMinOrderByAggregateInput
  }

  export type TransformerScalarWhereWithAggregatesInput = {
    AND?: Enumerable<TransformerScalarWhereWithAggregatesInput>
    OR?: Enumerable<TransformerScalarWhereWithAggregatesInput>
    NOT?: Enumerable<TransformerScalarWhereWithAggregatesInput>
    id?: StringWithAggregatesFilter | string
    createdAt?: DateTimeWithAggregatesFilter | Date | string
    updatedAt?: DateTimeWithAggregatesFilter | Date | string
    name?: StringWithAggregatesFilter | string
    tags?: StringNullableListFilter
    config?: JsonWithAggregatesFilter
    serviceId?: StringWithAggregatesFilter | string
  }

  export type TransformerConfigWhereInput = {
    AND?: Enumerable<TransformerConfigWhereInput>
    OR?: Enumerable<TransformerConfigWhereInput>
    NOT?: Enumerable<TransformerConfigWhereInput>
    id?: StringFilter | string
    createdAt?: DateTimeFilter | Date | string
    updatedAt?: DateTimeFilter | Date | string
    meta?: JsonFilter
    transformer?: XOR<TransformerRelationFilter, TransformerWhereInput>
    transformerId?: StringFilter | string
    ConversationLogic?: XOR<ConversationLogicRelationFilter, ConversationLogicWhereInput> | null
    conversationLogicId?: StringNullableFilter | string | null
  }

  export type TransformerConfigOrderByWithRelationInput = {
    id?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    meta?: SortOrder
    transformer?: TransformerOrderByWithRelationInput
    transformerId?: SortOrder
    ConversationLogic?: ConversationLogicOrderByWithRelationInput
    conversationLogicId?: SortOrder
  }

  export type TransformerConfigWhereUniqueInput = {
    id?: string
  }

  export type TransformerConfigOrderByWithAggregationInput = {
    id?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    meta?: SortOrder
    transformerId?: SortOrder
    conversationLogicId?: SortOrder
    _count?: TransformerConfigCountOrderByAggregateInput
    _max?: TransformerConfigMaxOrderByAggregateInput
    _min?: TransformerConfigMinOrderByAggregateInput
  }

  export type TransformerConfigScalarWhereWithAggregatesInput = {
    AND?: Enumerable<TransformerConfigScalarWhereWithAggregatesInput>
    OR?: Enumerable<TransformerConfigScalarWhereWithAggregatesInput>
    NOT?: Enumerable<TransformerConfigScalarWhereWithAggregatesInput>
    id?: StringWithAggregatesFilter | string
    createdAt?: DateTimeWithAggregatesFilter | Date | string
    updatedAt?: DateTimeWithAggregatesFilter | Date | string
    meta?: JsonWithAggregatesFilter
    transformerId?: StringWithAggregatesFilter | string
    conversationLogicId?: StringNullableWithAggregatesFilter | string | null
  }

  export type BotWhereInput = {
    AND?: Enumerable<BotWhereInput>
    OR?: Enumerable<BotWhereInput>
    NOT?: Enumerable<BotWhereInput>
    id?: StringFilter | string
    createdAt?: DateTimeFilter | Date | string
    updatedAt?: DateTimeFilter | Date | string
    name?: StringFilter | string
    startingMessage?: StringFilter | string
    users?: UserSegmentListRelationFilter
    logicIDs?: ConversationLogicListRelationFilter
    ownerID?: StringNullableFilter | string | null
    ownerOrgID?: StringNullableFilter | string | null
    purpose?: StringNullableFilter | string | null
    description?: StringNullableFilter | string | null
    startDate?: DateTimeNullableFilter | Date | string | null
    endDate?: DateTimeNullableFilter | Date | string | null
  }

  export type BotOrderByWithRelationInput = {
    id?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    name?: SortOrder
    startingMessage?: SortOrder
    users?: UserSegmentOrderByRelationAggregateInput
    logicIDs?: ConversationLogicOrderByRelationAggregateInput
    ownerID?: SortOrder
    ownerOrgID?: SortOrder
    purpose?: SortOrder
    description?: SortOrder
    startDate?: SortOrder
    endDate?: SortOrder
  }

  export type BotWhereUniqueInput = {
    id?: string
    name?: string
  }

  export type BotOrderByWithAggregationInput = {
    id?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    name?: SortOrder
    startingMessage?: SortOrder
    ownerID?: SortOrder
    ownerOrgID?: SortOrder
    purpose?: SortOrder
    description?: SortOrder
    startDate?: SortOrder
    endDate?: SortOrder
    _count?: BotCountOrderByAggregateInput
    _max?: BotMaxOrderByAggregateInput
    _min?: BotMinOrderByAggregateInput
  }

  export type BotScalarWhereWithAggregatesInput = {
    AND?: Enumerable<BotScalarWhereWithAggregatesInput>
    OR?: Enumerable<BotScalarWhereWithAggregatesInput>
    NOT?: Enumerable<BotScalarWhereWithAggregatesInput>
    id?: StringWithAggregatesFilter | string
    createdAt?: DateTimeWithAggregatesFilter | Date | string
    updatedAt?: DateTimeWithAggregatesFilter | Date | string
    name?: StringWithAggregatesFilter | string
    startingMessage?: StringWithAggregatesFilter | string
    ownerID?: StringNullableWithAggregatesFilter | string | null
    ownerOrgID?: StringNullableWithAggregatesFilter | string | null
    purpose?: StringNullableWithAggregatesFilter | string | null
    description?: StringNullableWithAggregatesFilter | string | null
    startDate?: DateTimeNullableWithAggregatesFilter | Date | string | null
    endDate?: DateTimeNullableWithAggregatesFilter | Date | string | null
  }

  export type UserSegmentWhereInput = {
    AND?: Enumerable<UserSegmentWhereInput>
    OR?: Enumerable<UserSegmentWhereInput>
    NOT?: Enumerable<UserSegmentWhereInput>
    id?: StringFilter | string
    createdAt?: DateTimeFilter | Date | string
    updatedAt?: DateTimeFilter | Date | string
    name?: StringFilter | string
    description?: StringNullableFilter | string | null
    count?: IntFilter | number
    category?: StringNullableFilter | string | null
    all?: XOR<ServiceRelationFilter, ServiceWhereInput> | null
    byID?: XOR<ServiceRelationFilter, ServiceWhereInput> | null
    byPhone?: XOR<ServiceRelationFilter, ServiceWhereInput> | null
    allServiceID?: StringNullableFilter | string | null
    byPhoneServiceID?: StringNullableFilter | string | null
    byIDServiceID?: StringNullableFilter | string | null
    bots?: BotListRelationFilter
    botId?: StringNullableFilter | string | null
  }

  export type UserSegmentOrderByWithRelationInput = {
    id?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    name?: SortOrder
    description?: SortOrder
    count?: SortOrder
    category?: SortOrder
    all?: ServiceOrderByWithRelationInput
    byID?: ServiceOrderByWithRelationInput
    byPhone?: ServiceOrderByWithRelationInput
    allServiceID?: SortOrder
    byPhoneServiceID?: SortOrder
    byIDServiceID?: SortOrder
    bots?: BotOrderByRelationAggregateInput
    botId?: SortOrder
  }

  export type UserSegmentWhereUniqueInput = {
    id?: string
    name?: string
  }

  export type UserSegmentOrderByWithAggregationInput = {
    id?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    name?: SortOrder
    description?: SortOrder
    count?: SortOrder
    category?: SortOrder
    allServiceID?: SortOrder
    byPhoneServiceID?: SortOrder
    byIDServiceID?: SortOrder
    botId?: SortOrder
    _count?: UserSegmentCountOrderByAggregateInput
    _avg?: UserSegmentAvgOrderByAggregateInput
    _max?: UserSegmentMaxOrderByAggregateInput
    _min?: UserSegmentMinOrderByAggregateInput
    _sum?: UserSegmentSumOrderByAggregateInput
  }

  export type UserSegmentScalarWhereWithAggregatesInput = {
    AND?: Enumerable<UserSegmentScalarWhereWithAggregatesInput>
    OR?: Enumerable<UserSegmentScalarWhereWithAggregatesInput>
    NOT?: Enumerable<UserSegmentScalarWhereWithAggregatesInput>
    id?: StringWithAggregatesFilter | string
    createdAt?: DateTimeWithAggregatesFilter | Date | string
    updatedAt?: DateTimeWithAggregatesFilter | Date | string
    name?: StringWithAggregatesFilter | string
    description?: StringNullableWithAggregatesFilter | string | null
    count?: IntWithAggregatesFilter | number
    category?: StringNullableWithAggregatesFilter | string | null
    allServiceID?: StringNullableWithAggregatesFilter | string | null
    byPhoneServiceID?: StringNullableWithAggregatesFilter | string | null
    byIDServiceID?: StringNullableWithAggregatesFilter | string | null
    botId?: StringNullableWithAggregatesFilter | string | null
  }

  export type ConversationLogicWhereInput = {
    AND?: Enumerable<ConversationLogicWhereInput>
    OR?: Enumerable<ConversationLogicWhereInput>
    NOT?: Enumerable<ConversationLogicWhereInput>
    id?: StringFilter | string
    name?: StringFilter | string
    createdAt?: DateTimeFilter | Date | string
    updatedAt?: DateTimeFilter | Date | string
    description?: StringNullableFilter | string | null
    adapter?: XOR<AdapterRelationFilter, AdapterWhereInput>
    adapterId?: StringFilter | string
    bots?: BotListRelationFilter
    transformers?: TransformerConfigListRelationFilter
  }

  export type ConversationLogicOrderByWithRelationInput = {
    id?: SortOrder
    name?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    description?: SortOrder
    adapter?: AdapterOrderByWithRelationInput
    adapterId?: SortOrder
    bots?: BotOrderByRelationAggregateInput
    transformers?: TransformerConfigOrderByRelationAggregateInput
  }

  export type ConversationLogicWhereUniqueInput = {
    id?: string
  }

  export type ConversationLogicOrderByWithAggregationInput = {
    id?: SortOrder
    name?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    description?: SortOrder
    adapterId?: SortOrder
    _count?: ConversationLogicCountOrderByAggregateInput
    _max?: ConversationLogicMaxOrderByAggregateInput
    _min?: ConversationLogicMinOrderByAggregateInput
  }

  export type ConversationLogicScalarWhereWithAggregatesInput = {
    AND?: Enumerable<ConversationLogicScalarWhereWithAggregatesInput>
    OR?: Enumerable<ConversationLogicScalarWhereWithAggregatesInput>
    NOT?: Enumerable<ConversationLogicScalarWhereWithAggregatesInput>
    id?: StringWithAggregatesFilter | string
    name?: StringWithAggregatesFilter | string
    createdAt?: DateTimeWithAggregatesFilter | Date | string
    updatedAt?: DateTimeWithAggregatesFilter | Date | string
    description?: StringNullableWithAggregatesFilter | string | null
    adapterId?: StringWithAggregatesFilter | string
  }

  export type AdapterCreateInput = {
    id?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    channel: string
    provider: string
    config: JsonNullValueInput | InputJsonValue
    name: string
    ConversationLogic?: ConversationLogicCreateNestedManyWithoutAdapterInput
  }

  export type AdapterUncheckedCreateInput = {
    id?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    channel: string
    provider: string
    config: JsonNullValueInput | InputJsonValue
    name: string
    ConversationLogic?: ConversationLogicUncheckedCreateNestedManyWithoutAdapterInput
  }

  export type AdapterUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    channel?: StringFieldUpdateOperationsInput | string
    provider?: StringFieldUpdateOperationsInput | string
    config?: JsonNullValueInput | InputJsonValue
    name?: StringFieldUpdateOperationsInput | string
    ConversationLogic?: ConversationLogicUpdateManyWithoutAdapterInput
  }

  export type AdapterUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    channel?: StringFieldUpdateOperationsInput | string
    provider?: StringFieldUpdateOperationsInput | string
    config?: JsonNullValueInput | InputJsonValue
    name?: StringFieldUpdateOperationsInput | string
    ConversationLogic?: ConversationLogicUncheckedUpdateManyWithoutAdapterInput
  }

  export type AdapterCreateManyInput = {
    id?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    channel: string
    provider: string
    config: JsonNullValueInput | InputJsonValue
    name: string
  }

  export type AdapterUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    channel?: StringFieldUpdateOperationsInput | string
    provider?: StringFieldUpdateOperationsInput | string
    config?: JsonNullValueInput | InputJsonValue
    name?: StringFieldUpdateOperationsInput | string
  }

  export type AdapterUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    channel?: StringFieldUpdateOperationsInput | string
    provider?: StringFieldUpdateOperationsInput | string
    config?: JsonNullValueInput | InputJsonValue
    name?: StringFieldUpdateOperationsInput | string
  }

  export type BoardCreateInput = {
    name: string
  }

  export type BoardUncheckedCreateInput = {
    id?: number
    name: string
  }

  export type BoardUpdateInput = {
    name?: StringFieldUpdateOperationsInput | string
  }

  export type BoardUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
  }

  export type BoardCreateManyInput = {
    id?: number
    name: string
  }

  export type BoardUpdateManyMutationInput = {
    name?: StringFieldUpdateOperationsInput | string
  }

  export type BoardUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
  }

  export type ServiceCreateInput = {
    id?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    type: string
    config?: NullableJsonNullValueInput | InputJsonValue
    name?: string | null
    Transformer?: TransformerCreateNestedManyWithoutServiceInput
    UserSegmentByID?: UserSegmentCreateNestedManyWithoutByIDInput
    UserSegmentByPhone?: UserSegmentCreateNestedManyWithoutByPhoneInput
    UserSegmentAll?: UserSegmentCreateNestedManyWithoutAllInput
  }

  export type ServiceUncheckedCreateInput = {
    id?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    type: string
    config?: NullableJsonNullValueInput | InputJsonValue
    name?: string | null
    Transformer?: TransformerUncheckedCreateNestedManyWithoutServiceInput
    UserSegmentByID?: UserSegmentUncheckedCreateNestedManyWithoutByIDInput
    UserSegmentByPhone?: UserSegmentUncheckedCreateNestedManyWithoutByPhoneInput
    UserSegmentAll?: UserSegmentUncheckedCreateNestedManyWithoutAllInput
  }

  export type ServiceUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    type?: StringFieldUpdateOperationsInput | string
    config?: NullableJsonNullValueInput | InputJsonValue
    name?: NullableStringFieldUpdateOperationsInput | string | null
    Transformer?: TransformerUpdateManyWithoutServiceInput
    UserSegmentByID?: UserSegmentUpdateManyWithoutByIDInput
    UserSegmentByPhone?: UserSegmentUpdateManyWithoutByPhoneInput
    UserSegmentAll?: UserSegmentUpdateManyWithoutAllInput
  }

  export type ServiceUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    type?: StringFieldUpdateOperationsInput | string
    config?: NullableJsonNullValueInput | InputJsonValue
    name?: NullableStringFieldUpdateOperationsInput | string | null
    Transformer?: TransformerUncheckedUpdateManyWithoutServiceInput
    UserSegmentByID?: UserSegmentUncheckedUpdateManyWithoutByIDInput
    UserSegmentByPhone?: UserSegmentUncheckedUpdateManyWithoutByPhoneInput
    UserSegmentAll?: UserSegmentUncheckedUpdateManyWithoutAllInput
  }

  export type ServiceCreateManyInput = {
    id?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    type: string
    config?: NullableJsonNullValueInput | InputJsonValue
    name?: string | null
  }

  export type ServiceUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    type?: StringFieldUpdateOperationsInput | string
    config?: NullableJsonNullValueInput | InputJsonValue
    name?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type ServiceUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    type?: StringFieldUpdateOperationsInput | string
    config?: NullableJsonNullValueInput | InputJsonValue
    name?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type TransformerCreateInput = {
    id?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    name: string
    tags?: TransformerCreatetagsInput | Enumerable<string>
    config: JsonNullValueInput | InputJsonValue
    service: ServiceCreateNestedOneWithoutTransformerInput
    TranformerConfig?: TransformerConfigCreateNestedManyWithoutTransformerInput
  }

  export type TransformerUncheckedCreateInput = {
    id?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    name: string
    tags?: TransformerCreatetagsInput | Enumerable<string>
    config: JsonNullValueInput | InputJsonValue
    serviceId: string
    TranformerConfig?: TransformerConfigUncheckedCreateNestedManyWithoutTransformerInput
  }

  export type TransformerUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    name?: StringFieldUpdateOperationsInput | string
    tags?: TransformerUpdatetagsInput | Enumerable<string>
    config?: JsonNullValueInput | InputJsonValue
    service?: ServiceUpdateOneRequiredWithoutTransformerInput
    TranformerConfig?: TransformerConfigUpdateManyWithoutTransformerInput
  }

  export type TransformerUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    name?: StringFieldUpdateOperationsInput | string
    tags?: TransformerUpdatetagsInput | Enumerable<string>
    config?: JsonNullValueInput | InputJsonValue
    serviceId?: StringFieldUpdateOperationsInput | string
    TranformerConfig?: TransformerConfigUncheckedUpdateManyWithoutTransformerInput
  }

  export type TransformerCreateManyInput = {
    id?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    name: string
    tags?: TransformerCreatetagsInput | Enumerable<string>
    config: JsonNullValueInput | InputJsonValue
    serviceId: string
  }

  export type TransformerUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    name?: StringFieldUpdateOperationsInput | string
    tags?: TransformerUpdatetagsInput | Enumerable<string>
    config?: JsonNullValueInput | InputJsonValue
  }

  export type TransformerUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    name?: StringFieldUpdateOperationsInput | string
    tags?: TransformerUpdatetagsInput | Enumerable<string>
    config?: JsonNullValueInput | InputJsonValue
    serviceId?: StringFieldUpdateOperationsInput | string
  }

  export type TransformerConfigCreateInput = {
    id?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    meta: JsonNullValueInput | InputJsonValue
    transformer: TransformerCreateNestedOneWithoutTranformerConfigInput
    ConversationLogic?: ConversationLogicCreateNestedOneWithoutTransformersInput
  }

  export type TransformerConfigUncheckedCreateInput = {
    id?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    meta: JsonNullValueInput | InputJsonValue
    transformerId: string
    conversationLogicId?: string | null
  }

  export type TransformerConfigUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    meta?: JsonNullValueInput | InputJsonValue
    transformer?: TransformerUpdateOneRequiredWithoutTranformerConfigInput
    ConversationLogic?: ConversationLogicUpdateOneWithoutTransformersInput
  }

  export type TransformerConfigUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    meta?: JsonNullValueInput | InputJsonValue
    transformerId?: StringFieldUpdateOperationsInput | string
    conversationLogicId?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type TransformerConfigCreateManyInput = {
    id?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    meta: JsonNullValueInput | InputJsonValue
    transformerId: string
    conversationLogicId?: string | null
  }

  export type TransformerConfigUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    meta?: JsonNullValueInput | InputJsonValue
  }

  export type TransformerConfigUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    meta?: JsonNullValueInput | InputJsonValue
    transformerId?: StringFieldUpdateOperationsInput | string
    conversationLogicId?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type BotCreateInput = {
    id?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    name: string
    startingMessage: string
    users?: UserSegmentCreateNestedManyWithoutBotsInput
    logicIDs?: ConversationLogicCreateNestedManyWithoutBotsInput
    ownerID?: string | null
    ownerOrgID?: string | null
    purpose?: string | null
    description?: string | null
    startDate?: Date | string | null
    endDate?: Date | string | null
  }

  export type BotUncheckedCreateInput = {
    id?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    name: string
    startingMessage: string
    users?: UserSegmentUncheckedCreateNestedManyWithoutBotsInput
    logicIDs?: ConversationLogicUncheckedCreateNestedManyWithoutBotsInput
    ownerID?: string | null
    ownerOrgID?: string | null
    purpose?: string | null
    description?: string | null
    startDate?: Date | string | null
    endDate?: Date | string | null
  }

  export type BotUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    name?: StringFieldUpdateOperationsInput | string
    startingMessage?: StringFieldUpdateOperationsInput | string
    users?: UserSegmentUpdateManyWithoutBotsInput
    logicIDs?: ConversationLogicUpdateManyWithoutBotsInput
    ownerID?: NullableStringFieldUpdateOperationsInput | string | null
    ownerOrgID?: NullableStringFieldUpdateOperationsInput | string | null
    purpose?: NullableStringFieldUpdateOperationsInput | string | null
    description?: NullableStringFieldUpdateOperationsInput | string | null
    startDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    endDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type BotUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    name?: StringFieldUpdateOperationsInput | string
    startingMessage?: StringFieldUpdateOperationsInput | string
    users?: UserSegmentUncheckedUpdateManyWithoutBotsInput
    logicIDs?: ConversationLogicUncheckedUpdateManyWithoutBotsInput
    ownerID?: NullableStringFieldUpdateOperationsInput | string | null
    ownerOrgID?: NullableStringFieldUpdateOperationsInput | string | null
    purpose?: NullableStringFieldUpdateOperationsInput | string | null
    description?: NullableStringFieldUpdateOperationsInput | string | null
    startDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    endDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type BotCreateManyInput = {
    id?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    name: string
    startingMessage: string
    ownerID?: string | null
    ownerOrgID?: string | null
    purpose?: string | null
    description?: string | null
    startDate?: Date | string | null
    endDate?: Date | string | null
  }

  export type BotUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    name?: StringFieldUpdateOperationsInput | string
    startingMessage?: StringFieldUpdateOperationsInput | string
    ownerID?: NullableStringFieldUpdateOperationsInput | string | null
    ownerOrgID?: NullableStringFieldUpdateOperationsInput | string | null
    purpose?: NullableStringFieldUpdateOperationsInput | string | null
    description?: NullableStringFieldUpdateOperationsInput | string | null
    startDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    endDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type BotUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    name?: StringFieldUpdateOperationsInput | string
    startingMessage?: StringFieldUpdateOperationsInput | string
    ownerID?: NullableStringFieldUpdateOperationsInput | string | null
    ownerOrgID?: NullableStringFieldUpdateOperationsInput | string | null
    purpose?: NullableStringFieldUpdateOperationsInput | string | null
    description?: NullableStringFieldUpdateOperationsInput | string | null
    startDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    endDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type UserSegmentCreateInput = {
    id?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    name: string
    description?: string | null
    count?: number
    category?: string | null
    all?: ServiceCreateNestedOneWithoutUserSegmentAllInput
    byID?: ServiceCreateNestedOneWithoutUserSegmentByIDInput
    byPhone?: ServiceCreateNestedOneWithoutUserSegmentByPhoneInput
    bots?: BotCreateNestedManyWithoutUsersInput
    botId?: string | null
  }

  export type UserSegmentUncheckedCreateInput = {
    id?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    name: string
    description?: string | null
    count?: number
    category?: string | null
    allServiceID?: string | null
    byPhoneServiceID?: string | null
    byIDServiceID?: string | null
    bots?: BotUncheckedCreateNestedManyWithoutUsersInput
    botId?: string | null
  }

  export type UserSegmentUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    count?: IntFieldUpdateOperationsInput | number
    category?: NullableStringFieldUpdateOperationsInput | string | null
    all?: ServiceUpdateOneWithoutUserSegmentAllInput
    byID?: ServiceUpdateOneWithoutUserSegmentByIDInput
    byPhone?: ServiceUpdateOneWithoutUserSegmentByPhoneInput
    bots?: BotUpdateManyWithoutUsersInput
    botId?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type UserSegmentUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    count?: IntFieldUpdateOperationsInput | number
    category?: NullableStringFieldUpdateOperationsInput | string | null
    allServiceID?: NullableStringFieldUpdateOperationsInput | string | null
    byPhoneServiceID?: NullableStringFieldUpdateOperationsInput | string | null
    byIDServiceID?: NullableStringFieldUpdateOperationsInput | string | null
    bots?: BotUncheckedUpdateManyWithoutUsersInput
    botId?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type UserSegmentCreateManyInput = {
    id?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    name: string
    description?: string | null
    count?: number
    category?: string | null
    allServiceID?: string | null
    byPhoneServiceID?: string | null
    byIDServiceID?: string | null
    botId?: string | null
  }

  export type UserSegmentUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    count?: IntFieldUpdateOperationsInput | number
    category?: NullableStringFieldUpdateOperationsInput | string | null
    botId?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type UserSegmentUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    count?: IntFieldUpdateOperationsInput | number
    category?: NullableStringFieldUpdateOperationsInput | string | null
    allServiceID?: NullableStringFieldUpdateOperationsInput | string | null
    byPhoneServiceID?: NullableStringFieldUpdateOperationsInput | string | null
    byIDServiceID?: NullableStringFieldUpdateOperationsInput | string | null
    botId?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type ConversationLogicCreateInput = {
    id?: string
    name: string
    createdAt?: Date | string
    updatedAt?: Date | string
    description?: string | null
    adapter: AdapterCreateNestedOneWithoutConversationLogicInput
    bots?: BotCreateNestedManyWithoutLogicIDsInput
    transformers?: TransformerConfigCreateNestedManyWithoutConversationLogicInput
  }

  export type ConversationLogicUncheckedCreateInput = {
    id?: string
    name: string
    createdAt?: Date | string
    updatedAt?: Date | string
    description?: string | null
    adapterId: string
    bots?: BotUncheckedCreateNestedManyWithoutLogicIDsInput
    transformers?: TransformerConfigUncheckedCreateNestedManyWithoutConversationLogicInput
  }

  export type ConversationLogicUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    adapter?: AdapterUpdateOneRequiredWithoutConversationLogicInput
    bots?: BotUpdateManyWithoutLogicIDsInput
    transformers?: TransformerConfigUpdateManyWithoutConversationLogicInput
  }

  export type ConversationLogicUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    adapterId?: StringFieldUpdateOperationsInput | string
    bots?: BotUncheckedUpdateManyWithoutLogicIDsInput
    transformers?: TransformerConfigUncheckedUpdateManyWithoutConversationLogicInput
  }

  export type ConversationLogicCreateManyInput = {
    id?: string
    name: string
    createdAt?: Date | string
    updatedAt?: Date | string
    description?: string | null
    adapterId: string
  }

  export type ConversationLogicUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type ConversationLogicUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    adapterId?: StringFieldUpdateOperationsInput | string
  }

  export type StringFilter = {
    equals?: string
    in?: Enumerable<string>
    notIn?: Enumerable<string>
    lt?: string
    lte?: string
    gt?: string
    gte?: string
    contains?: string
    startsWith?: string
    endsWith?: string
    mode?: QueryMode
    not?: NestedStringFilter | string
  }

  export type DateTimeFilter = {
    equals?: Date | string
    in?: Enumerable<Date> | Enumerable<string>
    notIn?: Enumerable<Date> | Enumerable<string>
    lt?: Date | string
    lte?: Date | string
    gt?: Date | string
    gte?: Date | string
    not?: NestedDateTimeFilter | Date | string
  }
  export type JsonFilter = 
    | PatchUndefined<
        Either<Required<JsonFilterBase>, Exclude<keyof Required<JsonFilterBase>, 'path'>>,
        Required<JsonFilterBase>
      >
    | OptionalFlat<Omit<Required<JsonFilterBase>, 'path'>>

  export type JsonFilterBase = {
    equals?: JsonNullValueFilter | InputJsonValue
    not?: JsonNullValueFilter | InputJsonValue
  }

  export type ConversationLogicListRelationFilter = {
    every?: ConversationLogicWhereInput
    some?: ConversationLogicWhereInput
    none?: ConversationLogicWhereInput
  }

  export type ConversationLogicOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type AdapterCountOrderByAggregateInput = {
    id?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    channel?: SortOrder
    provider?: SortOrder
    config?: SortOrder
    name?: SortOrder
  }

  export type AdapterMaxOrderByAggregateInput = {
    id?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    channel?: SortOrder
    provider?: SortOrder
    name?: SortOrder
  }

  export type AdapterMinOrderByAggregateInput = {
    id?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    channel?: SortOrder
    provider?: SortOrder
    name?: SortOrder
  }

  export type StringWithAggregatesFilter = {
    equals?: string
    in?: Enumerable<string>
    notIn?: Enumerable<string>
    lt?: string
    lte?: string
    gt?: string
    gte?: string
    contains?: string
    startsWith?: string
    endsWith?: string
    mode?: QueryMode
    not?: NestedStringWithAggregatesFilter | string
    _count?: NestedIntFilter
    _min?: NestedStringFilter
    _max?: NestedStringFilter
  }

  export type DateTimeWithAggregatesFilter = {
    equals?: Date | string
    in?: Enumerable<Date> | Enumerable<string>
    notIn?: Enumerable<Date> | Enumerable<string>
    lt?: Date | string
    lte?: Date | string
    gt?: Date | string
    gte?: Date | string
    not?: NestedDateTimeWithAggregatesFilter | Date | string
    _count?: NestedIntFilter
    _min?: NestedDateTimeFilter
    _max?: NestedDateTimeFilter
  }
  export type JsonWithAggregatesFilter = 
    | PatchUndefined<
        Either<Required<JsonWithAggregatesFilterBase>, Exclude<keyof Required<JsonWithAggregatesFilterBase>, 'path'>>,
        Required<JsonWithAggregatesFilterBase>
      >
    | OptionalFlat<Omit<Required<JsonWithAggregatesFilterBase>, 'path'>>

  export type JsonWithAggregatesFilterBase = {
    equals?: JsonNullValueFilter | InputJsonValue
    not?: JsonNullValueFilter | InputJsonValue
    _count?: NestedIntFilter
    _min?: NestedJsonFilter
    _max?: NestedJsonFilter
  }

  export type IntFilter = {
    equals?: number
    in?: Enumerable<number>
    notIn?: Enumerable<number>
    lt?: number
    lte?: number
    gt?: number
    gte?: number
    not?: NestedIntFilter | number
  }

  export type BoardCountOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
  }

  export type BoardAvgOrderByAggregateInput = {
    id?: SortOrder
  }

  export type BoardMaxOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
  }

  export type BoardMinOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
  }

  export type BoardSumOrderByAggregateInput = {
    id?: SortOrder
  }

  export type IntWithAggregatesFilter = {
    equals?: number
    in?: Enumerable<number>
    notIn?: Enumerable<number>
    lt?: number
    lte?: number
    gt?: number
    gte?: number
    not?: NestedIntWithAggregatesFilter | number
    _count?: NestedIntFilter
    _avg?: NestedFloatFilter
    _sum?: NestedIntFilter
    _min?: NestedIntFilter
    _max?: NestedIntFilter
  }
  export type JsonNullableFilter = 
    | PatchUndefined<
        Either<Required<JsonNullableFilterBase>, Exclude<keyof Required<JsonNullableFilterBase>, 'path'>>,
        Required<JsonNullableFilterBase>
      >
    | OptionalFlat<Omit<Required<JsonNullableFilterBase>, 'path'>>

  export type JsonNullableFilterBase = {
    equals?: JsonNullValueFilter | InputJsonValue
    not?: JsonNullValueFilter | InputJsonValue
  }

  export type StringNullableFilter = {
    equals?: string | null
    in?: Enumerable<string> | null
    notIn?: Enumerable<string> | null
    lt?: string
    lte?: string
    gt?: string
    gte?: string
    contains?: string
    startsWith?: string
    endsWith?: string
    mode?: QueryMode
    not?: NestedStringNullableFilter | string | null
  }

  export type TransformerListRelationFilter = {
    every?: TransformerWhereInput
    some?: TransformerWhereInput
    none?: TransformerWhereInput
  }

  export type UserSegmentListRelationFilter = {
    every?: UserSegmentWhereInput
    some?: UserSegmentWhereInput
    none?: UserSegmentWhereInput
  }

  export type TransformerOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type UserSegmentOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type ServiceCountOrderByAggregateInput = {
    id?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    type?: SortOrder
    config?: SortOrder
    name?: SortOrder
  }

  export type ServiceMaxOrderByAggregateInput = {
    id?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    type?: SortOrder
    name?: SortOrder
  }

  export type ServiceMinOrderByAggregateInput = {
    id?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    type?: SortOrder
    name?: SortOrder
  }
  export type JsonNullableWithAggregatesFilter = 
    | PatchUndefined<
        Either<Required<JsonNullableWithAggregatesFilterBase>, Exclude<keyof Required<JsonNullableWithAggregatesFilterBase>, 'path'>>,
        Required<JsonNullableWithAggregatesFilterBase>
      >
    | OptionalFlat<Omit<Required<JsonNullableWithAggregatesFilterBase>, 'path'>>

  export type JsonNullableWithAggregatesFilterBase = {
    equals?: JsonNullValueFilter | InputJsonValue
    not?: JsonNullValueFilter | InputJsonValue
    _count?: NestedIntNullableFilter
    _min?: NestedJsonNullableFilter
    _max?: NestedJsonNullableFilter
  }

  export type StringNullableWithAggregatesFilter = {
    equals?: string | null
    in?: Enumerable<string> | null
    notIn?: Enumerable<string> | null
    lt?: string
    lte?: string
    gt?: string
    gte?: string
    contains?: string
    startsWith?: string
    endsWith?: string
    mode?: QueryMode
    not?: NestedStringNullableWithAggregatesFilter | string | null
    _count?: NestedIntNullableFilter
    _min?: NestedStringNullableFilter
    _max?: NestedStringNullableFilter
  }

  export type StringNullableListFilter = {
    equals?: Enumerable<string> | null
    has?: string | null
    hasEvery?: Enumerable<string>
    hasSome?: Enumerable<string>
    isEmpty?: boolean
  }

  export type ServiceRelationFilter = {
    is?: ServiceWhereInput
    isNot?: ServiceWhereInput
  }

  export type TransformerConfigListRelationFilter = {
    every?: TransformerConfigWhereInput
    some?: TransformerConfigWhereInput
    none?: TransformerConfigWhereInput
  }

  export type TransformerConfigOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type TransformerCountOrderByAggregateInput = {
    id?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    name?: SortOrder
    tags?: SortOrder
    config?: SortOrder
    serviceId?: SortOrder
  }

  export type TransformerMaxOrderByAggregateInput = {
    id?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    name?: SortOrder
    serviceId?: SortOrder
  }

  export type TransformerMinOrderByAggregateInput = {
    id?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    name?: SortOrder
    serviceId?: SortOrder
  }

  export type TransformerRelationFilter = {
    is?: TransformerWhereInput
    isNot?: TransformerWhereInput
  }

  export type ConversationLogicRelationFilter = {
    is?: ConversationLogicWhereInput | null
    isNot?: ConversationLogicWhereInput | null
  }

  export type TransformerConfigCountOrderByAggregateInput = {
    id?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    meta?: SortOrder
    transformerId?: SortOrder
    conversationLogicId?: SortOrder
  }

  export type TransformerConfigMaxOrderByAggregateInput = {
    id?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    transformerId?: SortOrder
    conversationLogicId?: SortOrder
  }

  export type TransformerConfigMinOrderByAggregateInput = {
    id?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    transformerId?: SortOrder
    conversationLogicId?: SortOrder
  }

  export type DateTimeNullableFilter = {
    equals?: Date | string | null
    in?: Enumerable<Date> | Enumerable<string> | null
    notIn?: Enumerable<Date> | Enumerable<string> | null
    lt?: Date | string
    lte?: Date | string
    gt?: Date | string
    gte?: Date | string
    not?: NestedDateTimeNullableFilter | Date | string | null
  }

  export type BotCountOrderByAggregateInput = {
    id?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    name?: SortOrder
    startingMessage?: SortOrder
    ownerID?: SortOrder
    ownerOrgID?: SortOrder
    purpose?: SortOrder
    description?: SortOrder
    startDate?: SortOrder
    endDate?: SortOrder
  }

  export type BotMaxOrderByAggregateInput = {
    id?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    name?: SortOrder
    startingMessage?: SortOrder
    ownerID?: SortOrder
    ownerOrgID?: SortOrder
    purpose?: SortOrder
    description?: SortOrder
    startDate?: SortOrder
    endDate?: SortOrder
  }

  export type BotMinOrderByAggregateInput = {
    id?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    name?: SortOrder
    startingMessage?: SortOrder
    ownerID?: SortOrder
    ownerOrgID?: SortOrder
    purpose?: SortOrder
    description?: SortOrder
    startDate?: SortOrder
    endDate?: SortOrder
  }

  export type DateTimeNullableWithAggregatesFilter = {
    equals?: Date | string | null
    in?: Enumerable<Date> | Enumerable<string> | null
    notIn?: Enumerable<Date> | Enumerable<string> | null
    lt?: Date | string
    lte?: Date | string
    gt?: Date | string
    gte?: Date | string
    not?: NestedDateTimeNullableWithAggregatesFilter | Date | string | null
    _count?: NestedIntNullableFilter
    _min?: NestedDateTimeNullableFilter
    _max?: NestedDateTimeNullableFilter
  }

  export type BotListRelationFilter = {
    every?: BotWhereInput
    some?: BotWhereInput
    none?: BotWhereInput
  }

  export type BotOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type UserSegmentCountOrderByAggregateInput = {
    id?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    name?: SortOrder
    description?: SortOrder
    count?: SortOrder
    category?: SortOrder
    allServiceID?: SortOrder
    byPhoneServiceID?: SortOrder
    byIDServiceID?: SortOrder
    botId?: SortOrder
  }

  export type UserSegmentAvgOrderByAggregateInput = {
    count?: SortOrder
  }

  export type UserSegmentMaxOrderByAggregateInput = {
    id?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    name?: SortOrder
    description?: SortOrder
    count?: SortOrder
    category?: SortOrder
    allServiceID?: SortOrder
    byPhoneServiceID?: SortOrder
    byIDServiceID?: SortOrder
    botId?: SortOrder
  }

  export type UserSegmentMinOrderByAggregateInput = {
    id?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    name?: SortOrder
    description?: SortOrder
    count?: SortOrder
    category?: SortOrder
    allServiceID?: SortOrder
    byPhoneServiceID?: SortOrder
    byIDServiceID?: SortOrder
    botId?: SortOrder
  }

  export type UserSegmentSumOrderByAggregateInput = {
    count?: SortOrder
  }

  export type AdapterRelationFilter = {
    is?: AdapterWhereInput
    isNot?: AdapterWhereInput
  }

  export type ConversationLogicCountOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    description?: SortOrder
    adapterId?: SortOrder
  }

  export type ConversationLogicMaxOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    description?: SortOrder
    adapterId?: SortOrder
  }

  export type ConversationLogicMinOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    description?: SortOrder
    adapterId?: SortOrder
  }

  export type ConversationLogicCreateNestedManyWithoutAdapterInput = {
    create?: XOR<Enumerable<ConversationLogicCreateWithoutAdapterInput>, Enumerable<ConversationLogicUncheckedCreateWithoutAdapterInput>>
    connectOrCreate?: Enumerable<ConversationLogicCreateOrConnectWithoutAdapterInput>
    createMany?: ConversationLogicCreateManyAdapterInputEnvelope
    connect?: Enumerable<ConversationLogicWhereUniqueInput>
  }

  export type ConversationLogicUncheckedCreateNestedManyWithoutAdapterInput = {
    create?: XOR<Enumerable<ConversationLogicCreateWithoutAdapterInput>, Enumerable<ConversationLogicUncheckedCreateWithoutAdapterInput>>
    connectOrCreate?: Enumerable<ConversationLogicCreateOrConnectWithoutAdapterInput>
    createMany?: ConversationLogicCreateManyAdapterInputEnvelope
    connect?: Enumerable<ConversationLogicWhereUniqueInput>
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
  }

  export type ConversationLogicUpdateManyWithoutAdapterInput = {
    create?: XOR<Enumerable<ConversationLogicCreateWithoutAdapterInput>, Enumerable<ConversationLogicUncheckedCreateWithoutAdapterInput>>
    connectOrCreate?: Enumerable<ConversationLogicCreateOrConnectWithoutAdapterInput>
    upsert?: Enumerable<ConversationLogicUpsertWithWhereUniqueWithoutAdapterInput>
    createMany?: ConversationLogicCreateManyAdapterInputEnvelope
    set?: Enumerable<ConversationLogicWhereUniqueInput>
    disconnect?: Enumerable<ConversationLogicWhereUniqueInput>
    delete?: Enumerable<ConversationLogicWhereUniqueInput>
    connect?: Enumerable<ConversationLogicWhereUniqueInput>
    update?: Enumerable<ConversationLogicUpdateWithWhereUniqueWithoutAdapterInput>
    updateMany?: Enumerable<ConversationLogicUpdateManyWithWhereWithoutAdapterInput>
    deleteMany?: Enumerable<ConversationLogicScalarWhereInput>
  }

  export type ConversationLogicUncheckedUpdateManyWithoutAdapterInput = {
    create?: XOR<Enumerable<ConversationLogicCreateWithoutAdapterInput>, Enumerable<ConversationLogicUncheckedCreateWithoutAdapterInput>>
    connectOrCreate?: Enumerable<ConversationLogicCreateOrConnectWithoutAdapterInput>
    upsert?: Enumerable<ConversationLogicUpsertWithWhereUniqueWithoutAdapterInput>
    createMany?: ConversationLogicCreateManyAdapterInputEnvelope
    set?: Enumerable<ConversationLogicWhereUniqueInput>
    disconnect?: Enumerable<ConversationLogicWhereUniqueInput>
    delete?: Enumerable<ConversationLogicWhereUniqueInput>
    connect?: Enumerable<ConversationLogicWhereUniqueInput>
    update?: Enumerable<ConversationLogicUpdateWithWhereUniqueWithoutAdapterInput>
    updateMany?: Enumerable<ConversationLogicUpdateManyWithWhereWithoutAdapterInput>
    deleteMany?: Enumerable<ConversationLogicScalarWhereInput>
  }

  export type IntFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type TransformerCreateNestedManyWithoutServiceInput = {
    create?: XOR<Enumerable<TransformerCreateWithoutServiceInput>, Enumerable<TransformerUncheckedCreateWithoutServiceInput>>
    connectOrCreate?: Enumerable<TransformerCreateOrConnectWithoutServiceInput>
    createMany?: TransformerCreateManyServiceInputEnvelope
    connect?: Enumerable<TransformerWhereUniqueInput>
  }

  export type UserSegmentCreateNestedManyWithoutByIDInput = {
    create?: XOR<Enumerable<UserSegmentCreateWithoutByIDInput>, Enumerable<UserSegmentUncheckedCreateWithoutByIDInput>>
    connectOrCreate?: Enumerable<UserSegmentCreateOrConnectWithoutByIDInput>
    createMany?: UserSegmentCreateManyByIDInputEnvelope
    connect?: Enumerable<UserSegmentWhereUniqueInput>
  }

  export type UserSegmentCreateNestedManyWithoutByPhoneInput = {
    create?: XOR<Enumerable<UserSegmentCreateWithoutByPhoneInput>, Enumerable<UserSegmentUncheckedCreateWithoutByPhoneInput>>
    connectOrCreate?: Enumerable<UserSegmentCreateOrConnectWithoutByPhoneInput>
    createMany?: UserSegmentCreateManyByPhoneInputEnvelope
    connect?: Enumerable<UserSegmentWhereUniqueInput>
  }

  export type UserSegmentCreateNestedManyWithoutAllInput = {
    create?: XOR<Enumerable<UserSegmentCreateWithoutAllInput>, Enumerable<UserSegmentUncheckedCreateWithoutAllInput>>
    connectOrCreate?: Enumerable<UserSegmentCreateOrConnectWithoutAllInput>
    createMany?: UserSegmentCreateManyAllInputEnvelope
    connect?: Enumerable<UserSegmentWhereUniqueInput>
  }

  export type TransformerUncheckedCreateNestedManyWithoutServiceInput = {
    create?: XOR<Enumerable<TransformerCreateWithoutServiceInput>, Enumerable<TransformerUncheckedCreateWithoutServiceInput>>
    connectOrCreate?: Enumerable<TransformerCreateOrConnectWithoutServiceInput>
    createMany?: TransformerCreateManyServiceInputEnvelope
    connect?: Enumerable<TransformerWhereUniqueInput>
  }

  export type UserSegmentUncheckedCreateNestedManyWithoutByIDInput = {
    create?: XOR<Enumerable<UserSegmentCreateWithoutByIDInput>, Enumerable<UserSegmentUncheckedCreateWithoutByIDInput>>
    connectOrCreate?: Enumerable<UserSegmentCreateOrConnectWithoutByIDInput>
    createMany?: UserSegmentCreateManyByIDInputEnvelope
    connect?: Enumerable<UserSegmentWhereUniqueInput>
  }

  export type UserSegmentUncheckedCreateNestedManyWithoutByPhoneInput = {
    create?: XOR<Enumerable<UserSegmentCreateWithoutByPhoneInput>, Enumerable<UserSegmentUncheckedCreateWithoutByPhoneInput>>
    connectOrCreate?: Enumerable<UserSegmentCreateOrConnectWithoutByPhoneInput>
    createMany?: UserSegmentCreateManyByPhoneInputEnvelope
    connect?: Enumerable<UserSegmentWhereUniqueInput>
  }

  export type UserSegmentUncheckedCreateNestedManyWithoutAllInput = {
    create?: XOR<Enumerable<UserSegmentCreateWithoutAllInput>, Enumerable<UserSegmentUncheckedCreateWithoutAllInput>>
    connectOrCreate?: Enumerable<UserSegmentCreateOrConnectWithoutAllInput>
    createMany?: UserSegmentCreateManyAllInputEnvelope
    connect?: Enumerable<UserSegmentWhereUniqueInput>
  }

  export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null
  }

  export type TransformerUpdateManyWithoutServiceInput = {
    create?: XOR<Enumerable<TransformerCreateWithoutServiceInput>, Enumerable<TransformerUncheckedCreateWithoutServiceInput>>
    connectOrCreate?: Enumerable<TransformerCreateOrConnectWithoutServiceInput>
    upsert?: Enumerable<TransformerUpsertWithWhereUniqueWithoutServiceInput>
    createMany?: TransformerCreateManyServiceInputEnvelope
    set?: Enumerable<TransformerWhereUniqueInput>
    disconnect?: Enumerable<TransformerWhereUniqueInput>
    delete?: Enumerable<TransformerWhereUniqueInput>
    connect?: Enumerable<TransformerWhereUniqueInput>
    update?: Enumerable<TransformerUpdateWithWhereUniqueWithoutServiceInput>
    updateMany?: Enumerable<TransformerUpdateManyWithWhereWithoutServiceInput>
    deleteMany?: Enumerable<TransformerScalarWhereInput>
  }

  export type UserSegmentUpdateManyWithoutByIDInput = {
    create?: XOR<Enumerable<UserSegmentCreateWithoutByIDInput>, Enumerable<UserSegmentUncheckedCreateWithoutByIDInput>>
    connectOrCreate?: Enumerable<UserSegmentCreateOrConnectWithoutByIDInput>
    upsert?: Enumerable<UserSegmentUpsertWithWhereUniqueWithoutByIDInput>
    createMany?: UserSegmentCreateManyByIDInputEnvelope
    set?: Enumerable<UserSegmentWhereUniqueInput>
    disconnect?: Enumerable<UserSegmentWhereUniqueInput>
    delete?: Enumerable<UserSegmentWhereUniqueInput>
    connect?: Enumerable<UserSegmentWhereUniqueInput>
    update?: Enumerable<UserSegmentUpdateWithWhereUniqueWithoutByIDInput>
    updateMany?: Enumerable<UserSegmentUpdateManyWithWhereWithoutByIDInput>
    deleteMany?: Enumerable<UserSegmentScalarWhereInput>
  }

  export type UserSegmentUpdateManyWithoutByPhoneInput = {
    create?: XOR<Enumerable<UserSegmentCreateWithoutByPhoneInput>, Enumerable<UserSegmentUncheckedCreateWithoutByPhoneInput>>
    connectOrCreate?: Enumerable<UserSegmentCreateOrConnectWithoutByPhoneInput>
    upsert?: Enumerable<UserSegmentUpsertWithWhereUniqueWithoutByPhoneInput>
    createMany?: UserSegmentCreateManyByPhoneInputEnvelope
    set?: Enumerable<UserSegmentWhereUniqueInput>
    disconnect?: Enumerable<UserSegmentWhereUniqueInput>
    delete?: Enumerable<UserSegmentWhereUniqueInput>
    connect?: Enumerable<UserSegmentWhereUniqueInput>
    update?: Enumerable<UserSegmentUpdateWithWhereUniqueWithoutByPhoneInput>
    updateMany?: Enumerable<UserSegmentUpdateManyWithWhereWithoutByPhoneInput>
    deleteMany?: Enumerable<UserSegmentScalarWhereInput>
  }

  export type UserSegmentUpdateManyWithoutAllInput = {
    create?: XOR<Enumerable<UserSegmentCreateWithoutAllInput>, Enumerable<UserSegmentUncheckedCreateWithoutAllInput>>
    connectOrCreate?: Enumerable<UserSegmentCreateOrConnectWithoutAllInput>
    upsert?: Enumerable<UserSegmentUpsertWithWhereUniqueWithoutAllInput>
    createMany?: UserSegmentCreateManyAllInputEnvelope
    set?: Enumerable<UserSegmentWhereUniqueInput>
    disconnect?: Enumerable<UserSegmentWhereUniqueInput>
    delete?: Enumerable<UserSegmentWhereUniqueInput>
    connect?: Enumerable<UserSegmentWhereUniqueInput>
    update?: Enumerable<UserSegmentUpdateWithWhereUniqueWithoutAllInput>
    updateMany?: Enumerable<UserSegmentUpdateManyWithWhereWithoutAllInput>
    deleteMany?: Enumerable<UserSegmentScalarWhereInput>
  }

  export type TransformerUncheckedUpdateManyWithoutServiceInput = {
    create?: XOR<Enumerable<TransformerCreateWithoutServiceInput>, Enumerable<TransformerUncheckedCreateWithoutServiceInput>>
    connectOrCreate?: Enumerable<TransformerCreateOrConnectWithoutServiceInput>
    upsert?: Enumerable<TransformerUpsertWithWhereUniqueWithoutServiceInput>
    createMany?: TransformerCreateManyServiceInputEnvelope
    set?: Enumerable<TransformerWhereUniqueInput>
    disconnect?: Enumerable<TransformerWhereUniqueInput>
    delete?: Enumerable<TransformerWhereUniqueInput>
    connect?: Enumerable<TransformerWhereUniqueInput>
    update?: Enumerable<TransformerUpdateWithWhereUniqueWithoutServiceInput>
    updateMany?: Enumerable<TransformerUpdateManyWithWhereWithoutServiceInput>
    deleteMany?: Enumerable<TransformerScalarWhereInput>
  }

  export type UserSegmentUncheckedUpdateManyWithoutByIDInput = {
    create?: XOR<Enumerable<UserSegmentCreateWithoutByIDInput>, Enumerable<UserSegmentUncheckedCreateWithoutByIDInput>>
    connectOrCreate?: Enumerable<UserSegmentCreateOrConnectWithoutByIDInput>
    upsert?: Enumerable<UserSegmentUpsertWithWhereUniqueWithoutByIDInput>
    createMany?: UserSegmentCreateManyByIDInputEnvelope
    set?: Enumerable<UserSegmentWhereUniqueInput>
    disconnect?: Enumerable<UserSegmentWhereUniqueInput>
    delete?: Enumerable<UserSegmentWhereUniqueInput>
    connect?: Enumerable<UserSegmentWhereUniqueInput>
    update?: Enumerable<UserSegmentUpdateWithWhereUniqueWithoutByIDInput>
    updateMany?: Enumerable<UserSegmentUpdateManyWithWhereWithoutByIDInput>
    deleteMany?: Enumerable<UserSegmentScalarWhereInput>
  }

  export type UserSegmentUncheckedUpdateManyWithoutByPhoneInput = {
    create?: XOR<Enumerable<UserSegmentCreateWithoutByPhoneInput>, Enumerable<UserSegmentUncheckedCreateWithoutByPhoneInput>>
    connectOrCreate?: Enumerable<UserSegmentCreateOrConnectWithoutByPhoneInput>
    upsert?: Enumerable<UserSegmentUpsertWithWhereUniqueWithoutByPhoneInput>
    createMany?: UserSegmentCreateManyByPhoneInputEnvelope
    set?: Enumerable<UserSegmentWhereUniqueInput>
    disconnect?: Enumerable<UserSegmentWhereUniqueInput>
    delete?: Enumerable<UserSegmentWhereUniqueInput>
    connect?: Enumerable<UserSegmentWhereUniqueInput>
    update?: Enumerable<UserSegmentUpdateWithWhereUniqueWithoutByPhoneInput>
    updateMany?: Enumerable<UserSegmentUpdateManyWithWhereWithoutByPhoneInput>
    deleteMany?: Enumerable<UserSegmentScalarWhereInput>
  }

  export type UserSegmentUncheckedUpdateManyWithoutAllInput = {
    create?: XOR<Enumerable<UserSegmentCreateWithoutAllInput>, Enumerable<UserSegmentUncheckedCreateWithoutAllInput>>
    connectOrCreate?: Enumerable<UserSegmentCreateOrConnectWithoutAllInput>
    upsert?: Enumerable<UserSegmentUpsertWithWhereUniqueWithoutAllInput>
    createMany?: UserSegmentCreateManyAllInputEnvelope
    set?: Enumerable<UserSegmentWhereUniqueInput>
    disconnect?: Enumerable<UserSegmentWhereUniqueInput>
    delete?: Enumerable<UserSegmentWhereUniqueInput>
    connect?: Enumerable<UserSegmentWhereUniqueInput>
    update?: Enumerable<UserSegmentUpdateWithWhereUniqueWithoutAllInput>
    updateMany?: Enumerable<UserSegmentUpdateManyWithWhereWithoutAllInput>
    deleteMany?: Enumerable<UserSegmentScalarWhereInput>
  }

  export type TransformerCreatetagsInput = {
    set: Enumerable<string>
  }

  export type ServiceCreateNestedOneWithoutTransformerInput = {
    create?: XOR<ServiceCreateWithoutTransformerInput, ServiceUncheckedCreateWithoutTransformerInput>
    connectOrCreate?: ServiceCreateOrConnectWithoutTransformerInput
    connect?: ServiceWhereUniqueInput
  }

  export type TransformerConfigCreateNestedManyWithoutTransformerInput = {
    create?: XOR<Enumerable<TransformerConfigCreateWithoutTransformerInput>, Enumerable<TransformerConfigUncheckedCreateWithoutTransformerInput>>
    connectOrCreate?: Enumerable<TransformerConfigCreateOrConnectWithoutTransformerInput>
    createMany?: TransformerConfigCreateManyTransformerInputEnvelope
    connect?: Enumerable<TransformerConfigWhereUniqueInput>
  }

  export type TransformerConfigUncheckedCreateNestedManyWithoutTransformerInput = {
    create?: XOR<Enumerable<TransformerConfigCreateWithoutTransformerInput>, Enumerable<TransformerConfigUncheckedCreateWithoutTransformerInput>>
    connectOrCreate?: Enumerable<TransformerConfigCreateOrConnectWithoutTransformerInput>
    createMany?: TransformerConfigCreateManyTransformerInputEnvelope
    connect?: Enumerable<TransformerConfigWhereUniqueInput>
  }

  export type TransformerUpdatetagsInput = {
    set?: Enumerable<string>
    push?: string | Enumerable<string>
  }

  export type ServiceUpdateOneRequiredWithoutTransformerInput = {
    create?: XOR<ServiceCreateWithoutTransformerInput, ServiceUncheckedCreateWithoutTransformerInput>
    connectOrCreate?: ServiceCreateOrConnectWithoutTransformerInput
    upsert?: ServiceUpsertWithoutTransformerInput
    connect?: ServiceWhereUniqueInput
    update?: XOR<ServiceUpdateWithoutTransformerInput, ServiceUncheckedUpdateWithoutTransformerInput>
  }

  export type TransformerConfigUpdateManyWithoutTransformerInput = {
    create?: XOR<Enumerable<TransformerConfigCreateWithoutTransformerInput>, Enumerable<TransformerConfigUncheckedCreateWithoutTransformerInput>>
    connectOrCreate?: Enumerable<TransformerConfigCreateOrConnectWithoutTransformerInput>
    upsert?: Enumerable<TransformerConfigUpsertWithWhereUniqueWithoutTransformerInput>
    createMany?: TransformerConfigCreateManyTransformerInputEnvelope
    set?: Enumerable<TransformerConfigWhereUniqueInput>
    disconnect?: Enumerable<TransformerConfigWhereUniqueInput>
    delete?: Enumerable<TransformerConfigWhereUniqueInput>
    connect?: Enumerable<TransformerConfigWhereUniqueInput>
    update?: Enumerable<TransformerConfigUpdateWithWhereUniqueWithoutTransformerInput>
    updateMany?: Enumerable<TransformerConfigUpdateManyWithWhereWithoutTransformerInput>
    deleteMany?: Enumerable<TransformerConfigScalarWhereInput>
  }

  export type TransformerConfigUncheckedUpdateManyWithoutTransformerInput = {
    create?: XOR<Enumerable<TransformerConfigCreateWithoutTransformerInput>, Enumerable<TransformerConfigUncheckedCreateWithoutTransformerInput>>
    connectOrCreate?: Enumerable<TransformerConfigCreateOrConnectWithoutTransformerInput>
    upsert?: Enumerable<TransformerConfigUpsertWithWhereUniqueWithoutTransformerInput>
    createMany?: TransformerConfigCreateManyTransformerInputEnvelope
    set?: Enumerable<TransformerConfigWhereUniqueInput>
    disconnect?: Enumerable<TransformerConfigWhereUniqueInput>
    delete?: Enumerable<TransformerConfigWhereUniqueInput>
    connect?: Enumerable<TransformerConfigWhereUniqueInput>
    update?: Enumerable<TransformerConfigUpdateWithWhereUniqueWithoutTransformerInput>
    updateMany?: Enumerable<TransformerConfigUpdateManyWithWhereWithoutTransformerInput>
    deleteMany?: Enumerable<TransformerConfigScalarWhereInput>
  }

  export type TransformerCreateNestedOneWithoutTranformerConfigInput = {
    create?: XOR<TransformerCreateWithoutTranformerConfigInput, TransformerUncheckedCreateWithoutTranformerConfigInput>
    connectOrCreate?: TransformerCreateOrConnectWithoutTranformerConfigInput
    connect?: TransformerWhereUniqueInput
  }

  export type ConversationLogicCreateNestedOneWithoutTransformersInput = {
    create?: XOR<ConversationLogicCreateWithoutTransformersInput, ConversationLogicUncheckedCreateWithoutTransformersInput>
    connectOrCreate?: ConversationLogicCreateOrConnectWithoutTransformersInput
    connect?: ConversationLogicWhereUniqueInput
  }

  export type TransformerUpdateOneRequiredWithoutTranformerConfigInput = {
    create?: XOR<TransformerCreateWithoutTranformerConfigInput, TransformerUncheckedCreateWithoutTranformerConfigInput>
    connectOrCreate?: TransformerCreateOrConnectWithoutTranformerConfigInput
    upsert?: TransformerUpsertWithoutTranformerConfigInput
    connect?: TransformerWhereUniqueInput
    update?: XOR<TransformerUpdateWithoutTranformerConfigInput, TransformerUncheckedUpdateWithoutTranformerConfigInput>
  }

  export type ConversationLogicUpdateOneWithoutTransformersInput = {
    create?: XOR<ConversationLogicCreateWithoutTransformersInput, ConversationLogicUncheckedCreateWithoutTransformersInput>
    connectOrCreate?: ConversationLogicCreateOrConnectWithoutTransformersInput
    upsert?: ConversationLogicUpsertWithoutTransformersInput
    disconnect?: boolean
    delete?: boolean
    connect?: ConversationLogicWhereUniqueInput
    update?: XOR<ConversationLogicUpdateWithoutTransformersInput, ConversationLogicUncheckedUpdateWithoutTransformersInput>
  }

  export type UserSegmentCreateNestedManyWithoutBotsInput = {
    create?: XOR<Enumerable<UserSegmentCreateWithoutBotsInput>, Enumerable<UserSegmentUncheckedCreateWithoutBotsInput>>
    connectOrCreate?: Enumerable<UserSegmentCreateOrConnectWithoutBotsInput>
    connect?: Enumerable<UserSegmentWhereUniqueInput>
  }

  export type ConversationLogicCreateNestedManyWithoutBotsInput = {
    create?: XOR<Enumerable<ConversationLogicCreateWithoutBotsInput>, Enumerable<ConversationLogicUncheckedCreateWithoutBotsInput>>
    connectOrCreate?: Enumerable<ConversationLogicCreateOrConnectWithoutBotsInput>
    connect?: Enumerable<ConversationLogicWhereUniqueInput>
  }

  export type UserSegmentUncheckedCreateNestedManyWithoutBotsInput = {
    create?: XOR<Enumerable<UserSegmentCreateWithoutBotsInput>, Enumerable<UserSegmentUncheckedCreateWithoutBotsInput>>
    connectOrCreate?: Enumerable<UserSegmentCreateOrConnectWithoutBotsInput>
    connect?: Enumerable<UserSegmentWhereUniqueInput>
  }

  export type ConversationLogicUncheckedCreateNestedManyWithoutBotsInput = {
    create?: XOR<Enumerable<ConversationLogicCreateWithoutBotsInput>, Enumerable<ConversationLogicUncheckedCreateWithoutBotsInput>>
    connectOrCreate?: Enumerable<ConversationLogicCreateOrConnectWithoutBotsInput>
    connect?: Enumerable<ConversationLogicWhereUniqueInput>
  }

  export type UserSegmentUpdateManyWithoutBotsInput = {
    create?: XOR<Enumerable<UserSegmentCreateWithoutBotsInput>, Enumerable<UserSegmentUncheckedCreateWithoutBotsInput>>
    connectOrCreate?: Enumerable<UserSegmentCreateOrConnectWithoutBotsInput>
    upsert?: Enumerable<UserSegmentUpsertWithWhereUniqueWithoutBotsInput>
    set?: Enumerable<UserSegmentWhereUniqueInput>
    disconnect?: Enumerable<UserSegmentWhereUniqueInput>
    delete?: Enumerable<UserSegmentWhereUniqueInput>
    connect?: Enumerable<UserSegmentWhereUniqueInput>
    update?: Enumerable<UserSegmentUpdateWithWhereUniqueWithoutBotsInput>
    updateMany?: Enumerable<UserSegmentUpdateManyWithWhereWithoutBotsInput>
    deleteMany?: Enumerable<UserSegmentScalarWhereInput>
  }

  export type ConversationLogicUpdateManyWithoutBotsInput = {
    create?: XOR<Enumerable<ConversationLogicCreateWithoutBotsInput>, Enumerable<ConversationLogicUncheckedCreateWithoutBotsInput>>
    connectOrCreate?: Enumerable<ConversationLogicCreateOrConnectWithoutBotsInput>
    upsert?: Enumerable<ConversationLogicUpsertWithWhereUniqueWithoutBotsInput>
    set?: Enumerable<ConversationLogicWhereUniqueInput>
    disconnect?: Enumerable<ConversationLogicWhereUniqueInput>
    delete?: Enumerable<ConversationLogicWhereUniqueInput>
    connect?: Enumerable<ConversationLogicWhereUniqueInput>
    update?: Enumerable<ConversationLogicUpdateWithWhereUniqueWithoutBotsInput>
    updateMany?: Enumerable<ConversationLogicUpdateManyWithWhereWithoutBotsInput>
    deleteMany?: Enumerable<ConversationLogicScalarWhereInput>
  }

  export type NullableDateTimeFieldUpdateOperationsInput = {
    set?: Date | string | null
  }

  export type UserSegmentUncheckedUpdateManyWithoutBotsInput = {
    create?: XOR<Enumerable<UserSegmentCreateWithoutBotsInput>, Enumerable<UserSegmentUncheckedCreateWithoutBotsInput>>
    connectOrCreate?: Enumerable<UserSegmentCreateOrConnectWithoutBotsInput>
    upsert?: Enumerable<UserSegmentUpsertWithWhereUniqueWithoutBotsInput>
    set?: Enumerable<UserSegmentWhereUniqueInput>
    disconnect?: Enumerable<UserSegmentWhereUniqueInput>
    delete?: Enumerable<UserSegmentWhereUniqueInput>
    connect?: Enumerable<UserSegmentWhereUniqueInput>
    update?: Enumerable<UserSegmentUpdateWithWhereUniqueWithoutBotsInput>
    updateMany?: Enumerable<UserSegmentUpdateManyWithWhereWithoutBotsInput>
    deleteMany?: Enumerable<UserSegmentScalarWhereInput>
  }

  export type ConversationLogicUncheckedUpdateManyWithoutBotsInput = {
    create?: XOR<Enumerable<ConversationLogicCreateWithoutBotsInput>, Enumerable<ConversationLogicUncheckedCreateWithoutBotsInput>>
    connectOrCreate?: Enumerable<ConversationLogicCreateOrConnectWithoutBotsInput>
    upsert?: Enumerable<ConversationLogicUpsertWithWhereUniqueWithoutBotsInput>
    set?: Enumerable<ConversationLogicWhereUniqueInput>
    disconnect?: Enumerable<ConversationLogicWhereUniqueInput>
    delete?: Enumerable<ConversationLogicWhereUniqueInput>
    connect?: Enumerable<ConversationLogicWhereUniqueInput>
    update?: Enumerable<ConversationLogicUpdateWithWhereUniqueWithoutBotsInput>
    updateMany?: Enumerable<ConversationLogicUpdateManyWithWhereWithoutBotsInput>
    deleteMany?: Enumerable<ConversationLogicScalarWhereInput>
  }

  export type ServiceCreateNestedOneWithoutUserSegmentAllInput = {
    create?: XOR<ServiceCreateWithoutUserSegmentAllInput, ServiceUncheckedCreateWithoutUserSegmentAllInput>
    connectOrCreate?: ServiceCreateOrConnectWithoutUserSegmentAllInput
    connect?: ServiceWhereUniqueInput
  }

  export type ServiceCreateNestedOneWithoutUserSegmentByIDInput = {
    create?: XOR<ServiceCreateWithoutUserSegmentByIDInput, ServiceUncheckedCreateWithoutUserSegmentByIDInput>
    connectOrCreate?: ServiceCreateOrConnectWithoutUserSegmentByIDInput
    connect?: ServiceWhereUniqueInput
  }

  export type ServiceCreateNestedOneWithoutUserSegmentByPhoneInput = {
    create?: XOR<ServiceCreateWithoutUserSegmentByPhoneInput, ServiceUncheckedCreateWithoutUserSegmentByPhoneInput>
    connectOrCreate?: ServiceCreateOrConnectWithoutUserSegmentByPhoneInput
    connect?: ServiceWhereUniqueInput
  }

  export type BotCreateNestedManyWithoutUsersInput = {
    create?: XOR<Enumerable<BotCreateWithoutUsersInput>, Enumerable<BotUncheckedCreateWithoutUsersInput>>
    connectOrCreate?: Enumerable<BotCreateOrConnectWithoutUsersInput>
    connect?: Enumerable<BotWhereUniqueInput>
  }

  export type BotUncheckedCreateNestedManyWithoutUsersInput = {
    create?: XOR<Enumerable<BotCreateWithoutUsersInput>, Enumerable<BotUncheckedCreateWithoutUsersInput>>
    connectOrCreate?: Enumerable<BotCreateOrConnectWithoutUsersInput>
    connect?: Enumerable<BotWhereUniqueInput>
  }

  export type ServiceUpdateOneWithoutUserSegmentAllInput = {
    create?: XOR<ServiceCreateWithoutUserSegmentAllInput, ServiceUncheckedCreateWithoutUserSegmentAllInput>
    connectOrCreate?: ServiceCreateOrConnectWithoutUserSegmentAllInput
    upsert?: ServiceUpsertWithoutUserSegmentAllInput
    disconnect?: boolean
    delete?: boolean
    connect?: ServiceWhereUniqueInput
    update?: XOR<ServiceUpdateWithoutUserSegmentAllInput, ServiceUncheckedUpdateWithoutUserSegmentAllInput>
  }

  export type ServiceUpdateOneWithoutUserSegmentByIDInput = {
    create?: XOR<ServiceCreateWithoutUserSegmentByIDInput, ServiceUncheckedCreateWithoutUserSegmentByIDInput>
    connectOrCreate?: ServiceCreateOrConnectWithoutUserSegmentByIDInput
    upsert?: ServiceUpsertWithoutUserSegmentByIDInput
    disconnect?: boolean
    delete?: boolean
    connect?: ServiceWhereUniqueInput
    update?: XOR<ServiceUpdateWithoutUserSegmentByIDInput, ServiceUncheckedUpdateWithoutUserSegmentByIDInput>
  }

  export type ServiceUpdateOneWithoutUserSegmentByPhoneInput = {
    create?: XOR<ServiceCreateWithoutUserSegmentByPhoneInput, ServiceUncheckedCreateWithoutUserSegmentByPhoneInput>
    connectOrCreate?: ServiceCreateOrConnectWithoutUserSegmentByPhoneInput
    upsert?: ServiceUpsertWithoutUserSegmentByPhoneInput
    disconnect?: boolean
    delete?: boolean
    connect?: ServiceWhereUniqueInput
    update?: XOR<ServiceUpdateWithoutUserSegmentByPhoneInput, ServiceUncheckedUpdateWithoutUserSegmentByPhoneInput>
  }

  export type BotUpdateManyWithoutUsersInput = {
    create?: XOR<Enumerable<BotCreateWithoutUsersInput>, Enumerable<BotUncheckedCreateWithoutUsersInput>>
    connectOrCreate?: Enumerable<BotCreateOrConnectWithoutUsersInput>
    upsert?: Enumerable<BotUpsertWithWhereUniqueWithoutUsersInput>
    set?: Enumerable<BotWhereUniqueInput>
    disconnect?: Enumerable<BotWhereUniqueInput>
    delete?: Enumerable<BotWhereUniqueInput>
    connect?: Enumerable<BotWhereUniqueInput>
    update?: Enumerable<BotUpdateWithWhereUniqueWithoutUsersInput>
    updateMany?: Enumerable<BotUpdateManyWithWhereWithoutUsersInput>
    deleteMany?: Enumerable<BotScalarWhereInput>
  }

  export type BotUncheckedUpdateManyWithoutUsersInput = {
    create?: XOR<Enumerable<BotCreateWithoutUsersInput>, Enumerable<BotUncheckedCreateWithoutUsersInput>>
    connectOrCreate?: Enumerable<BotCreateOrConnectWithoutUsersInput>
    upsert?: Enumerable<BotUpsertWithWhereUniqueWithoutUsersInput>
    set?: Enumerable<BotWhereUniqueInput>
    disconnect?: Enumerable<BotWhereUniqueInput>
    delete?: Enumerable<BotWhereUniqueInput>
    connect?: Enumerable<BotWhereUniqueInput>
    update?: Enumerable<BotUpdateWithWhereUniqueWithoutUsersInput>
    updateMany?: Enumerable<BotUpdateManyWithWhereWithoutUsersInput>
    deleteMany?: Enumerable<BotScalarWhereInput>
  }

  export type AdapterCreateNestedOneWithoutConversationLogicInput = {
    create?: XOR<AdapterCreateWithoutConversationLogicInput, AdapterUncheckedCreateWithoutConversationLogicInput>
    connectOrCreate?: AdapterCreateOrConnectWithoutConversationLogicInput
    connect?: AdapterWhereUniqueInput
  }

  export type BotCreateNestedManyWithoutLogicIDsInput = {
    create?: XOR<Enumerable<BotCreateWithoutLogicIDsInput>, Enumerable<BotUncheckedCreateWithoutLogicIDsInput>>
    connectOrCreate?: Enumerable<BotCreateOrConnectWithoutLogicIDsInput>
    connect?: Enumerable<BotWhereUniqueInput>
  }

  export type TransformerConfigCreateNestedManyWithoutConversationLogicInput = {
    create?: XOR<Enumerable<TransformerConfigCreateWithoutConversationLogicInput>, Enumerable<TransformerConfigUncheckedCreateWithoutConversationLogicInput>>
    connectOrCreate?: Enumerable<TransformerConfigCreateOrConnectWithoutConversationLogicInput>
    createMany?: TransformerConfigCreateManyConversationLogicInputEnvelope
    connect?: Enumerable<TransformerConfigWhereUniqueInput>
  }

  export type BotUncheckedCreateNestedManyWithoutLogicIDsInput = {
    create?: XOR<Enumerable<BotCreateWithoutLogicIDsInput>, Enumerable<BotUncheckedCreateWithoutLogicIDsInput>>
    connectOrCreate?: Enumerable<BotCreateOrConnectWithoutLogicIDsInput>
    connect?: Enumerable<BotWhereUniqueInput>
  }

  export type TransformerConfigUncheckedCreateNestedManyWithoutConversationLogicInput = {
    create?: XOR<Enumerable<TransformerConfigCreateWithoutConversationLogicInput>, Enumerable<TransformerConfigUncheckedCreateWithoutConversationLogicInput>>
    connectOrCreate?: Enumerable<TransformerConfigCreateOrConnectWithoutConversationLogicInput>
    createMany?: TransformerConfigCreateManyConversationLogicInputEnvelope
    connect?: Enumerable<TransformerConfigWhereUniqueInput>
  }

  export type AdapterUpdateOneRequiredWithoutConversationLogicInput = {
    create?: XOR<AdapterCreateWithoutConversationLogicInput, AdapterUncheckedCreateWithoutConversationLogicInput>
    connectOrCreate?: AdapterCreateOrConnectWithoutConversationLogicInput
    upsert?: AdapterUpsertWithoutConversationLogicInput
    connect?: AdapterWhereUniqueInput
    update?: XOR<AdapterUpdateWithoutConversationLogicInput, AdapterUncheckedUpdateWithoutConversationLogicInput>
  }

  export type BotUpdateManyWithoutLogicIDsInput = {
    create?: XOR<Enumerable<BotCreateWithoutLogicIDsInput>, Enumerable<BotUncheckedCreateWithoutLogicIDsInput>>
    connectOrCreate?: Enumerable<BotCreateOrConnectWithoutLogicIDsInput>
    upsert?: Enumerable<BotUpsertWithWhereUniqueWithoutLogicIDsInput>
    set?: Enumerable<BotWhereUniqueInput>
    disconnect?: Enumerable<BotWhereUniqueInput>
    delete?: Enumerable<BotWhereUniqueInput>
    connect?: Enumerable<BotWhereUniqueInput>
    update?: Enumerable<BotUpdateWithWhereUniqueWithoutLogicIDsInput>
    updateMany?: Enumerable<BotUpdateManyWithWhereWithoutLogicIDsInput>
    deleteMany?: Enumerable<BotScalarWhereInput>
  }

  export type TransformerConfigUpdateManyWithoutConversationLogicInput = {
    create?: XOR<Enumerable<TransformerConfigCreateWithoutConversationLogicInput>, Enumerable<TransformerConfigUncheckedCreateWithoutConversationLogicInput>>
    connectOrCreate?: Enumerable<TransformerConfigCreateOrConnectWithoutConversationLogicInput>
    upsert?: Enumerable<TransformerConfigUpsertWithWhereUniqueWithoutConversationLogicInput>
    createMany?: TransformerConfigCreateManyConversationLogicInputEnvelope
    set?: Enumerable<TransformerConfigWhereUniqueInput>
    disconnect?: Enumerable<TransformerConfigWhereUniqueInput>
    delete?: Enumerable<TransformerConfigWhereUniqueInput>
    connect?: Enumerable<TransformerConfigWhereUniqueInput>
    update?: Enumerable<TransformerConfigUpdateWithWhereUniqueWithoutConversationLogicInput>
    updateMany?: Enumerable<TransformerConfigUpdateManyWithWhereWithoutConversationLogicInput>
    deleteMany?: Enumerable<TransformerConfigScalarWhereInput>
  }

  export type BotUncheckedUpdateManyWithoutLogicIDsInput = {
    create?: XOR<Enumerable<BotCreateWithoutLogicIDsInput>, Enumerable<BotUncheckedCreateWithoutLogicIDsInput>>
    connectOrCreate?: Enumerable<BotCreateOrConnectWithoutLogicIDsInput>
    upsert?: Enumerable<BotUpsertWithWhereUniqueWithoutLogicIDsInput>
    set?: Enumerable<BotWhereUniqueInput>
    disconnect?: Enumerable<BotWhereUniqueInput>
    delete?: Enumerable<BotWhereUniqueInput>
    connect?: Enumerable<BotWhereUniqueInput>
    update?: Enumerable<BotUpdateWithWhereUniqueWithoutLogicIDsInput>
    updateMany?: Enumerable<BotUpdateManyWithWhereWithoutLogicIDsInput>
    deleteMany?: Enumerable<BotScalarWhereInput>
  }

  export type TransformerConfigUncheckedUpdateManyWithoutConversationLogicInput = {
    create?: XOR<Enumerable<TransformerConfigCreateWithoutConversationLogicInput>, Enumerable<TransformerConfigUncheckedCreateWithoutConversationLogicInput>>
    connectOrCreate?: Enumerable<TransformerConfigCreateOrConnectWithoutConversationLogicInput>
    upsert?: Enumerable<TransformerConfigUpsertWithWhereUniqueWithoutConversationLogicInput>
    createMany?: TransformerConfigCreateManyConversationLogicInputEnvelope
    set?: Enumerable<TransformerConfigWhereUniqueInput>
    disconnect?: Enumerable<TransformerConfigWhereUniqueInput>
    delete?: Enumerable<TransformerConfigWhereUniqueInput>
    connect?: Enumerable<TransformerConfigWhereUniqueInput>
    update?: Enumerable<TransformerConfigUpdateWithWhereUniqueWithoutConversationLogicInput>
    updateMany?: Enumerable<TransformerConfigUpdateManyWithWhereWithoutConversationLogicInput>
    deleteMany?: Enumerable<TransformerConfigScalarWhereInput>
  }

  export type NestedStringFilter = {
    equals?: string
    in?: Enumerable<string>
    notIn?: Enumerable<string>
    lt?: string
    lte?: string
    gt?: string
    gte?: string
    contains?: string
    startsWith?: string
    endsWith?: string
    not?: NestedStringFilter | string
  }

  export type NestedDateTimeFilter = {
    equals?: Date | string
    in?: Enumerable<Date> | Enumerable<string>
    notIn?: Enumerable<Date> | Enumerable<string>
    lt?: Date | string
    lte?: Date | string
    gt?: Date | string
    gte?: Date | string
    not?: NestedDateTimeFilter | Date | string
  }

  export type NestedStringWithAggregatesFilter = {
    equals?: string
    in?: Enumerable<string>
    notIn?: Enumerable<string>
    lt?: string
    lte?: string
    gt?: string
    gte?: string
    contains?: string
    startsWith?: string
    endsWith?: string
    not?: NestedStringWithAggregatesFilter | string
    _count?: NestedIntFilter
    _min?: NestedStringFilter
    _max?: NestedStringFilter
  }

  export type NestedIntFilter = {
    equals?: number
    in?: Enumerable<number>
    notIn?: Enumerable<number>
    lt?: number
    lte?: number
    gt?: number
    gte?: number
    not?: NestedIntFilter | number
  }

  export type NestedDateTimeWithAggregatesFilter = {
    equals?: Date | string
    in?: Enumerable<Date> | Enumerable<string>
    notIn?: Enumerable<Date> | Enumerable<string>
    lt?: Date | string
    lte?: Date | string
    gt?: Date | string
    gte?: Date | string
    not?: NestedDateTimeWithAggregatesFilter | Date | string
    _count?: NestedIntFilter
    _min?: NestedDateTimeFilter
    _max?: NestedDateTimeFilter
  }
  export type NestedJsonFilter = 
    | PatchUndefined<
        Either<Required<NestedJsonFilterBase>, Exclude<keyof Required<NestedJsonFilterBase>, 'path'>>,
        Required<NestedJsonFilterBase>
      >
    | OptionalFlat<Omit<Required<NestedJsonFilterBase>, 'path'>>

  export type NestedJsonFilterBase = {
    equals?: JsonNullValueFilter | InputJsonValue
    not?: JsonNullValueFilter | InputJsonValue
  }

  export type NestedIntWithAggregatesFilter = {
    equals?: number
    in?: Enumerable<number>
    notIn?: Enumerable<number>
    lt?: number
    lte?: number
    gt?: number
    gte?: number
    not?: NestedIntWithAggregatesFilter | number
    _count?: NestedIntFilter
    _avg?: NestedFloatFilter
    _sum?: NestedIntFilter
    _min?: NestedIntFilter
    _max?: NestedIntFilter
  }

  export type NestedFloatFilter = {
    equals?: number
    in?: Enumerable<number>
    notIn?: Enumerable<number>
    lt?: number
    lte?: number
    gt?: number
    gte?: number
    not?: NestedFloatFilter | number
  }

  export type NestedStringNullableFilter = {
    equals?: string | null
    in?: Enumerable<string> | null
    notIn?: Enumerable<string> | null
    lt?: string
    lte?: string
    gt?: string
    gte?: string
    contains?: string
    startsWith?: string
    endsWith?: string
    not?: NestedStringNullableFilter | string | null
  }

  export type NestedIntNullableFilter = {
    equals?: number | null
    in?: Enumerable<number> | null
    notIn?: Enumerable<number> | null
    lt?: number
    lte?: number
    gt?: number
    gte?: number
    not?: NestedIntNullableFilter | number | null
  }
  export type NestedJsonNullableFilter = 
    | PatchUndefined<
        Either<Required<NestedJsonNullableFilterBase>, Exclude<keyof Required<NestedJsonNullableFilterBase>, 'path'>>,
        Required<NestedJsonNullableFilterBase>
      >
    | OptionalFlat<Omit<Required<NestedJsonNullableFilterBase>, 'path'>>

  export type NestedJsonNullableFilterBase = {
    equals?: JsonNullValueFilter | InputJsonValue
    not?: JsonNullValueFilter | InputJsonValue
  }

  export type NestedStringNullableWithAggregatesFilter = {
    equals?: string | null
    in?: Enumerable<string> | null
    notIn?: Enumerable<string> | null
    lt?: string
    lte?: string
    gt?: string
    gte?: string
    contains?: string
    startsWith?: string
    endsWith?: string
    not?: NestedStringNullableWithAggregatesFilter | string | null
    _count?: NestedIntNullableFilter
    _min?: NestedStringNullableFilter
    _max?: NestedStringNullableFilter
  }

  export type NestedDateTimeNullableFilter = {
    equals?: Date | string | null
    in?: Enumerable<Date> | Enumerable<string> | null
    notIn?: Enumerable<Date> | Enumerable<string> | null
    lt?: Date | string
    lte?: Date | string
    gt?: Date | string
    gte?: Date | string
    not?: NestedDateTimeNullableFilter | Date | string | null
  }

  export type NestedDateTimeNullableWithAggregatesFilter = {
    equals?: Date | string | null
    in?: Enumerable<Date> | Enumerable<string> | null
    notIn?: Enumerable<Date> | Enumerable<string> | null
    lt?: Date | string
    lte?: Date | string
    gt?: Date | string
    gte?: Date | string
    not?: NestedDateTimeNullableWithAggregatesFilter | Date | string | null
    _count?: NestedIntNullableFilter
    _min?: NestedDateTimeNullableFilter
    _max?: NestedDateTimeNullableFilter
  }

  export type ConversationLogicCreateWithoutAdapterInput = {
    id?: string
    name: string
    createdAt?: Date | string
    updatedAt?: Date | string
    description?: string | null
    bots?: BotCreateNestedManyWithoutLogicIDsInput
    transformers?: TransformerConfigCreateNestedManyWithoutConversationLogicInput
  }

  export type ConversationLogicUncheckedCreateWithoutAdapterInput = {
    id?: string
    name: string
    createdAt?: Date | string
    updatedAt?: Date | string
    description?: string | null
    bots?: BotUncheckedCreateNestedManyWithoutLogicIDsInput
    transformers?: TransformerConfigUncheckedCreateNestedManyWithoutConversationLogicInput
  }

  export type ConversationLogicCreateOrConnectWithoutAdapterInput = {
    where: ConversationLogicWhereUniqueInput
    create: XOR<ConversationLogicCreateWithoutAdapterInput, ConversationLogicUncheckedCreateWithoutAdapterInput>
  }

  export type ConversationLogicCreateManyAdapterInputEnvelope = {
    data: Enumerable<ConversationLogicCreateManyAdapterInput>
    skipDuplicates?: boolean
  }

  export type ConversationLogicUpsertWithWhereUniqueWithoutAdapterInput = {
    where: ConversationLogicWhereUniqueInput
    update: XOR<ConversationLogicUpdateWithoutAdapterInput, ConversationLogicUncheckedUpdateWithoutAdapterInput>
    create: XOR<ConversationLogicCreateWithoutAdapterInput, ConversationLogicUncheckedCreateWithoutAdapterInput>
  }

  export type ConversationLogicUpdateWithWhereUniqueWithoutAdapterInput = {
    where: ConversationLogicWhereUniqueInput
    data: XOR<ConversationLogicUpdateWithoutAdapterInput, ConversationLogicUncheckedUpdateWithoutAdapterInput>
  }

  export type ConversationLogicUpdateManyWithWhereWithoutAdapterInput = {
    where: ConversationLogicScalarWhereInput
    data: XOR<ConversationLogicUpdateManyMutationInput, ConversationLogicUncheckedUpdateManyWithoutConversationLogicInput>
  }

  export type ConversationLogicScalarWhereInput = {
    AND?: Enumerable<ConversationLogicScalarWhereInput>
    OR?: Enumerable<ConversationLogicScalarWhereInput>
    NOT?: Enumerable<ConversationLogicScalarWhereInput>
    id?: StringFilter | string
    name?: StringFilter | string
    createdAt?: DateTimeFilter | Date | string
    updatedAt?: DateTimeFilter | Date | string
    description?: StringNullableFilter | string | null
    adapterId?: StringFilter | string
  }

  export type TransformerCreateWithoutServiceInput = {
    id?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    name: string
    tags?: TransformerCreatetagsInput | Enumerable<string>
    config: JsonNullValueInput | InputJsonValue
    TranformerConfig?: TransformerConfigCreateNestedManyWithoutTransformerInput
  }

  export type TransformerUncheckedCreateWithoutServiceInput = {
    id?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    name: string
    tags?: TransformerCreatetagsInput | Enumerable<string>
    config: JsonNullValueInput | InputJsonValue
    TranformerConfig?: TransformerConfigUncheckedCreateNestedManyWithoutTransformerInput
  }

  export type TransformerCreateOrConnectWithoutServiceInput = {
    where: TransformerWhereUniqueInput
    create: XOR<TransformerCreateWithoutServiceInput, TransformerUncheckedCreateWithoutServiceInput>
  }

  export type TransformerCreateManyServiceInputEnvelope = {
    data: Enumerable<TransformerCreateManyServiceInput>
    skipDuplicates?: boolean
  }

  export type UserSegmentCreateWithoutByIDInput = {
    id?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    name: string
    description?: string | null
    count?: number
    category?: string | null
    all?: ServiceCreateNestedOneWithoutUserSegmentAllInput
    byPhone?: ServiceCreateNestedOneWithoutUserSegmentByPhoneInput
    bots?: BotCreateNestedManyWithoutUsersInput
    botId?: string | null
  }

  export type UserSegmentUncheckedCreateWithoutByIDInput = {
    id?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    name: string
    description?: string | null
    count?: number
    category?: string | null
    allServiceID?: string | null
    byPhoneServiceID?: string | null
    bots?: BotUncheckedCreateNestedManyWithoutUsersInput
    botId?: string | null
  }

  export type UserSegmentCreateOrConnectWithoutByIDInput = {
    where: UserSegmentWhereUniqueInput
    create: XOR<UserSegmentCreateWithoutByIDInput, UserSegmentUncheckedCreateWithoutByIDInput>
  }

  export type UserSegmentCreateManyByIDInputEnvelope = {
    data: Enumerable<UserSegmentCreateManyByIDInput>
    skipDuplicates?: boolean
  }

  export type UserSegmentCreateWithoutByPhoneInput = {
    id?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    name: string
    description?: string | null
    count?: number
    category?: string | null
    all?: ServiceCreateNestedOneWithoutUserSegmentAllInput
    byID?: ServiceCreateNestedOneWithoutUserSegmentByIDInput
    bots?: BotCreateNestedManyWithoutUsersInput
    botId?: string | null
  }

  export type UserSegmentUncheckedCreateWithoutByPhoneInput = {
    id?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    name: string
    description?: string | null
    count?: number
    category?: string | null
    allServiceID?: string | null
    byIDServiceID?: string | null
    bots?: BotUncheckedCreateNestedManyWithoutUsersInput
    botId?: string | null
  }

  export type UserSegmentCreateOrConnectWithoutByPhoneInput = {
    where: UserSegmentWhereUniqueInput
    create: XOR<UserSegmentCreateWithoutByPhoneInput, UserSegmentUncheckedCreateWithoutByPhoneInput>
  }

  export type UserSegmentCreateManyByPhoneInputEnvelope = {
    data: Enumerable<UserSegmentCreateManyByPhoneInput>
    skipDuplicates?: boolean
  }

  export type UserSegmentCreateWithoutAllInput = {
    id?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    name: string
    description?: string | null
    count?: number
    category?: string | null
    byID?: ServiceCreateNestedOneWithoutUserSegmentByIDInput
    byPhone?: ServiceCreateNestedOneWithoutUserSegmentByPhoneInput
    bots?: BotCreateNestedManyWithoutUsersInput
    botId?: string | null
  }

  export type UserSegmentUncheckedCreateWithoutAllInput = {
    id?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    name: string
    description?: string | null
    count?: number
    category?: string | null
    byPhoneServiceID?: string | null
    byIDServiceID?: string | null
    bots?: BotUncheckedCreateNestedManyWithoutUsersInput
    botId?: string | null
  }

  export type UserSegmentCreateOrConnectWithoutAllInput = {
    where: UserSegmentWhereUniqueInput
    create: XOR<UserSegmentCreateWithoutAllInput, UserSegmentUncheckedCreateWithoutAllInput>
  }

  export type UserSegmentCreateManyAllInputEnvelope = {
    data: Enumerable<UserSegmentCreateManyAllInput>
    skipDuplicates?: boolean
  }

  export type TransformerUpsertWithWhereUniqueWithoutServiceInput = {
    where: TransformerWhereUniqueInput
    update: XOR<TransformerUpdateWithoutServiceInput, TransformerUncheckedUpdateWithoutServiceInput>
    create: XOR<TransformerCreateWithoutServiceInput, TransformerUncheckedCreateWithoutServiceInput>
  }

  export type TransformerUpdateWithWhereUniqueWithoutServiceInput = {
    where: TransformerWhereUniqueInput
    data: XOR<TransformerUpdateWithoutServiceInput, TransformerUncheckedUpdateWithoutServiceInput>
  }

  export type TransformerUpdateManyWithWhereWithoutServiceInput = {
    where: TransformerScalarWhereInput
    data: XOR<TransformerUpdateManyMutationInput, TransformerUncheckedUpdateManyWithoutTransformerInput>
  }

  export type TransformerScalarWhereInput = {
    AND?: Enumerable<TransformerScalarWhereInput>
    OR?: Enumerable<TransformerScalarWhereInput>
    NOT?: Enumerable<TransformerScalarWhereInput>
    id?: StringFilter | string
    createdAt?: DateTimeFilter | Date | string
    updatedAt?: DateTimeFilter | Date | string
    name?: StringFilter | string
    tags?: StringNullableListFilter
    config?: JsonFilter
    serviceId?: StringFilter | string
  }

  export type UserSegmentUpsertWithWhereUniqueWithoutByIDInput = {
    where: UserSegmentWhereUniqueInput
    update: XOR<UserSegmentUpdateWithoutByIDInput, UserSegmentUncheckedUpdateWithoutByIDInput>
    create: XOR<UserSegmentCreateWithoutByIDInput, UserSegmentUncheckedCreateWithoutByIDInput>
  }

  export type UserSegmentUpdateWithWhereUniqueWithoutByIDInput = {
    where: UserSegmentWhereUniqueInput
    data: XOR<UserSegmentUpdateWithoutByIDInput, UserSegmentUncheckedUpdateWithoutByIDInput>
  }

  export type UserSegmentUpdateManyWithWhereWithoutByIDInput = {
    where: UserSegmentScalarWhereInput
    data: XOR<UserSegmentUpdateManyMutationInput, UserSegmentUncheckedUpdateManyWithoutUserSegmentByIDInput>
  }

  export type UserSegmentScalarWhereInput = {
    AND?: Enumerable<UserSegmentScalarWhereInput>
    OR?: Enumerable<UserSegmentScalarWhereInput>
    NOT?: Enumerable<UserSegmentScalarWhereInput>
    id?: StringFilter | string
    createdAt?: DateTimeFilter | Date | string
    updatedAt?: DateTimeFilter | Date | string
    name?: StringFilter | string
    description?: StringNullableFilter | string | null
    count?: IntFilter | number
    category?: StringNullableFilter | string | null
    allServiceID?: StringNullableFilter | string | null
    byPhoneServiceID?: StringNullableFilter | string | null
    byIDServiceID?: StringNullableFilter | string | null
    botId?: StringNullableFilter | string | null
  }

  export type UserSegmentUpsertWithWhereUniqueWithoutByPhoneInput = {
    where: UserSegmentWhereUniqueInput
    update: XOR<UserSegmentUpdateWithoutByPhoneInput, UserSegmentUncheckedUpdateWithoutByPhoneInput>
    create: XOR<UserSegmentCreateWithoutByPhoneInput, UserSegmentUncheckedCreateWithoutByPhoneInput>
  }

  export type UserSegmentUpdateWithWhereUniqueWithoutByPhoneInput = {
    where: UserSegmentWhereUniqueInput
    data: XOR<UserSegmentUpdateWithoutByPhoneInput, UserSegmentUncheckedUpdateWithoutByPhoneInput>
  }

  export type UserSegmentUpdateManyWithWhereWithoutByPhoneInput = {
    where: UserSegmentScalarWhereInput
    data: XOR<UserSegmentUpdateManyMutationInput, UserSegmentUncheckedUpdateManyWithoutUserSegmentByPhoneInput>
  }

  export type UserSegmentUpsertWithWhereUniqueWithoutAllInput = {
    where: UserSegmentWhereUniqueInput
    update: XOR<UserSegmentUpdateWithoutAllInput, UserSegmentUncheckedUpdateWithoutAllInput>
    create: XOR<UserSegmentCreateWithoutAllInput, UserSegmentUncheckedCreateWithoutAllInput>
  }

  export type UserSegmentUpdateWithWhereUniqueWithoutAllInput = {
    where: UserSegmentWhereUniqueInput
    data: XOR<UserSegmentUpdateWithoutAllInput, UserSegmentUncheckedUpdateWithoutAllInput>
  }

  export type UserSegmentUpdateManyWithWhereWithoutAllInput = {
    where: UserSegmentScalarWhereInput
    data: XOR<UserSegmentUpdateManyMutationInput, UserSegmentUncheckedUpdateManyWithoutUserSegmentAllInput>
  }

  export type ServiceCreateWithoutTransformerInput = {
    id?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    type: string
    config?: NullableJsonNullValueInput | InputJsonValue
    name?: string | null
    UserSegmentByID?: UserSegmentCreateNestedManyWithoutByIDInput
    UserSegmentByPhone?: UserSegmentCreateNestedManyWithoutByPhoneInput
    UserSegmentAll?: UserSegmentCreateNestedManyWithoutAllInput
  }

  export type ServiceUncheckedCreateWithoutTransformerInput = {
    id?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    type: string
    config?: NullableJsonNullValueInput | InputJsonValue
    name?: string | null
    UserSegmentByID?: UserSegmentUncheckedCreateNestedManyWithoutByIDInput
    UserSegmentByPhone?: UserSegmentUncheckedCreateNestedManyWithoutByPhoneInput
    UserSegmentAll?: UserSegmentUncheckedCreateNestedManyWithoutAllInput
  }

  export type ServiceCreateOrConnectWithoutTransformerInput = {
    where: ServiceWhereUniqueInput
    create: XOR<ServiceCreateWithoutTransformerInput, ServiceUncheckedCreateWithoutTransformerInput>
  }

  export type TransformerConfigCreateWithoutTransformerInput = {
    id?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    meta: JsonNullValueInput | InputJsonValue
    ConversationLogic?: ConversationLogicCreateNestedOneWithoutTransformersInput
  }

  export type TransformerConfigUncheckedCreateWithoutTransformerInput = {
    id?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    meta: JsonNullValueInput | InputJsonValue
    conversationLogicId?: string | null
  }

  export type TransformerConfigCreateOrConnectWithoutTransformerInput = {
    where: TransformerConfigWhereUniqueInput
    create: XOR<TransformerConfigCreateWithoutTransformerInput, TransformerConfigUncheckedCreateWithoutTransformerInput>
  }

  export type TransformerConfigCreateManyTransformerInputEnvelope = {
    data: Enumerable<TransformerConfigCreateManyTransformerInput>
    skipDuplicates?: boolean
  }

  export type ServiceUpsertWithoutTransformerInput = {
    update: XOR<ServiceUpdateWithoutTransformerInput, ServiceUncheckedUpdateWithoutTransformerInput>
    create: XOR<ServiceCreateWithoutTransformerInput, ServiceUncheckedCreateWithoutTransformerInput>
  }

  export type ServiceUpdateWithoutTransformerInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    type?: StringFieldUpdateOperationsInput | string
    config?: NullableJsonNullValueInput | InputJsonValue
    name?: NullableStringFieldUpdateOperationsInput | string | null
    UserSegmentByID?: UserSegmentUpdateManyWithoutByIDInput
    UserSegmentByPhone?: UserSegmentUpdateManyWithoutByPhoneInput
    UserSegmentAll?: UserSegmentUpdateManyWithoutAllInput
  }

  export type ServiceUncheckedUpdateWithoutTransformerInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    type?: StringFieldUpdateOperationsInput | string
    config?: NullableJsonNullValueInput | InputJsonValue
    name?: NullableStringFieldUpdateOperationsInput | string | null
    UserSegmentByID?: UserSegmentUncheckedUpdateManyWithoutByIDInput
    UserSegmentByPhone?: UserSegmentUncheckedUpdateManyWithoutByPhoneInput
    UserSegmentAll?: UserSegmentUncheckedUpdateManyWithoutAllInput
  }

  export type TransformerConfigUpsertWithWhereUniqueWithoutTransformerInput = {
    where: TransformerConfigWhereUniqueInput
    update: XOR<TransformerConfigUpdateWithoutTransformerInput, TransformerConfigUncheckedUpdateWithoutTransformerInput>
    create: XOR<TransformerConfigCreateWithoutTransformerInput, TransformerConfigUncheckedCreateWithoutTransformerInput>
  }

  export type TransformerConfigUpdateWithWhereUniqueWithoutTransformerInput = {
    where: TransformerConfigWhereUniqueInput
    data: XOR<TransformerConfigUpdateWithoutTransformerInput, TransformerConfigUncheckedUpdateWithoutTransformerInput>
  }

  export type TransformerConfigUpdateManyWithWhereWithoutTransformerInput = {
    where: TransformerConfigScalarWhereInput
    data: XOR<TransformerConfigUpdateManyMutationInput, TransformerConfigUncheckedUpdateManyWithoutTranformerConfigInput>
  }

  export type TransformerConfigScalarWhereInput = {
    AND?: Enumerable<TransformerConfigScalarWhereInput>
    OR?: Enumerable<TransformerConfigScalarWhereInput>
    NOT?: Enumerable<TransformerConfigScalarWhereInput>
    id?: StringFilter | string
    createdAt?: DateTimeFilter | Date | string
    updatedAt?: DateTimeFilter | Date | string
    meta?: JsonFilter
    transformerId?: StringFilter | string
    conversationLogicId?: StringNullableFilter | string | null
  }

  export type TransformerCreateWithoutTranformerConfigInput = {
    id?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    name: string
    tags?: TransformerCreatetagsInput | Enumerable<string>
    config: JsonNullValueInput | InputJsonValue
    service: ServiceCreateNestedOneWithoutTransformerInput
  }

  export type TransformerUncheckedCreateWithoutTranformerConfigInput = {
    id?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    name: string
    tags?: TransformerCreatetagsInput | Enumerable<string>
    config: JsonNullValueInput | InputJsonValue
    serviceId: string
  }

  export type TransformerCreateOrConnectWithoutTranformerConfigInput = {
    where: TransformerWhereUniqueInput
    create: XOR<TransformerCreateWithoutTranformerConfigInput, TransformerUncheckedCreateWithoutTranformerConfigInput>
  }

  export type ConversationLogicCreateWithoutTransformersInput = {
    id?: string
    name: string
    createdAt?: Date | string
    updatedAt?: Date | string
    description?: string | null
    adapter: AdapterCreateNestedOneWithoutConversationLogicInput
    bots?: BotCreateNestedManyWithoutLogicIDsInput
  }

  export type ConversationLogicUncheckedCreateWithoutTransformersInput = {
    id?: string
    name: string
    createdAt?: Date | string
    updatedAt?: Date | string
    description?: string | null
    adapterId: string
    bots?: BotUncheckedCreateNestedManyWithoutLogicIDsInput
  }

  export type ConversationLogicCreateOrConnectWithoutTransformersInput = {
    where: ConversationLogicWhereUniqueInput
    create: XOR<ConversationLogicCreateWithoutTransformersInput, ConversationLogicUncheckedCreateWithoutTransformersInput>
  }

  export type TransformerUpsertWithoutTranformerConfigInput = {
    update: XOR<TransformerUpdateWithoutTranformerConfigInput, TransformerUncheckedUpdateWithoutTranformerConfigInput>
    create: XOR<TransformerCreateWithoutTranformerConfigInput, TransformerUncheckedCreateWithoutTranformerConfigInput>
  }

  export type TransformerUpdateWithoutTranformerConfigInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    name?: StringFieldUpdateOperationsInput | string
    tags?: TransformerUpdatetagsInput | Enumerable<string>
    config?: JsonNullValueInput | InputJsonValue
    service?: ServiceUpdateOneRequiredWithoutTransformerInput
  }

  export type TransformerUncheckedUpdateWithoutTranformerConfigInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    name?: StringFieldUpdateOperationsInput | string
    tags?: TransformerUpdatetagsInput | Enumerable<string>
    config?: JsonNullValueInput | InputJsonValue
    serviceId?: StringFieldUpdateOperationsInput | string
  }

  export type ConversationLogicUpsertWithoutTransformersInput = {
    update: XOR<ConversationLogicUpdateWithoutTransformersInput, ConversationLogicUncheckedUpdateWithoutTransformersInput>
    create: XOR<ConversationLogicCreateWithoutTransformersInput, ConversationLogicUncheckedCreateWithoutTransformersInput>
  }

  export type ConversationLogicUpdateWithoutTransformersInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    adapter?: AdapterUpdateOneRequiredWithoutConversationLogicInput
    bots?: BotUpdateManyWithoutLogicIDsInput
  }

  export type ConversationLogicUncheckedUpdateWithoutTransformersInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    adapterId?: StringFieldUpdateOperationsInput | string
    bots?: BotUncheckedUpdateManyWithoutLogicIDsInput
  }

  export type UserSegmentCreateWithoutBotsInput = {
    id?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    name: string
    description?: string | null
    count?: number
    category?: string | null
    all?: ServiceCreateNestedOneWithoutUserSegmentAllInput
    byID?: ServiceCreateNestedOneWithoutUserSegmentByIDInput
    byPhone?: ServiceCreateNestedOneWithoutUserSegmentByPhoneInput
    botId?: string | null
  }

  export type UserSegmentUncheckedCreateWithoutBotsInput = {
    id?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    name: string
    description?: string | null
    count?: number
    category?: string | null
    allServiceID?: string | null
    byPhoneServiceID?: string | null
    byIDServiceID?: string | null
    botId?: string | null
  }

  export type UserSegmentCreateOrConnectWithoutBotsInput = {
    where: UserSegmentWhereUniqueInput
    create: XOR<UserSegmentCreateWithoutBotsInput, UserSegmentUncheckedCreateWithoutBotsInput>
  }

  export type ConversationLogicCreateWithoutBotsInput = {
    id?: string
    name: string
    createdAt?: Date | string
    updatedAt?: Date | string
    description?: string | null
    adapter: AdapterCreateNestedOneWithoutConversationLogicInput
    transformers?: TransformerConfigCreateNestedManyWithoutConversationLogicInput
  }

  export type ConversationLogicUncheckedCreateWithoutBotsInput = {
    id?: string
    name: string
    createdAt?: Date | string
    updatedAt?: Date | string
    description?: string | null
    adapterId: string
    transformers?: TransformerConfigUncheckedCreateNestedManyWithoutConversationLogicInput
  }

  export type ConversationLogicCreateOrConnectWithoutBotsInput = {
    where: ConversationLogicWhereUniqueInput
    create: XOR<ConversationLogicCreateWithoutBotsInput, ConversationLogicUncheckedCreateWithoutBotsInput>
  }

  export type UserSegmentUpsertWithWhereUniqueWithoutBotsInput = {
    where: UserSegmentWhereUniqueInput
    update: XOR<UserSegmentUpdateWithoutBotsInput, UserSegmentUncheckedUpdateWithoutBotsInput>
    create: XOR<UserSegmentCreateWithoutBotsInput, UserSegmentUncheckedCreateWithoutBotsInput>
  }

  export type UserSegmentUpdateWithWhereUniqueWithoutBotsInput = {
    where: UserSegmentWhereUniqueInput
    data: XOR<UserSegmentUpdateWithoutBotsInput, UserSegmentUncheckedUpdateWithoutBotsInput>
  }

  export type UserSegmentUpdateManyWithWhereWithoutBotsInput = {
    where: UserSegmentScalarWhereInput
    data: XOR<UserSegmentUpdateManyMutationInput, UserSegmentUncheckedUpdateManyWithoutUsersInput>
  }

  export type ConversationLogicUpsertWithWhereUniqueWithoutBotsInput = {
    where: ConversationLogicWhereUniqueInput
    update: XOR<ConversationLogicUpdateWithoutBotsInput, ConversationLogicUncheckedUpdateWithoutBotsInput>
    create: XOR<ConversationLogicCreateWithoutBotsInput, ConversationLogicUncheckedCreateWithoutBotsInput>
  }

  export type ConversationLogicUpdateWithWhereUniqueWithoutBotsInput = {
    where: ConversationLogicWhereUniqueInput
    data: XOR<ConversationLogicUpdateWithoutBotsInput, ConversationLogicUncheckedUpdateWithoutBotsInput>
  }

  export type ConversationLogicUpdateManyWithWhereWithoutBotsInput = {
    where: ConversationLogicScalarWhereInput
    data: XOR<ConversationLogicUpdateManyMutationInput, ConversationLogicUncheckedUpdateManyWithoutLogicIDsInput>
  }

  export type ServiceCreateWithoutUserSegmentAllInput = {
    id?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    type: string
    config?: NullableJsonNullValueInput | InputJsonValue
    name?: string | null
    Transformer?: TransformerCreateNestedManyWithoutServiceInput
    UserSegmentByID?: UserSegmentCreateNestedManyWithoutByIDInput
    UserSegmentByPhone?: UserSegmentCreateNestedManyWithoutByPhoneInput
  }

  export type ServiceUncheckedCreateWithoutUserSegmentAllInput = {
    id?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    type: string
    config?: NullableJsonNullValueInput | InputJsonValue
    name?: string | null
    Transformer?: TransformerUncheckedCreateNestedManyWithoutServiceInput
    UserSegmentByID?: UserSegmentUncheckedCreateNestedManyWithoutByIDInput
    UserSegmentByPhone?: UserSegmentUncheckedCreateNestedManyWithoutByPhoneInput
  }

  export type ServiceCreateOrConnectWithoutUserSegmentAllInput = {
    where: ServiceWhereUniqueInput
    create: XOR<ServiceCreateWithoutUserSegmentAllInput, ServiceUncheckedCreateWithoutUserSegmentAllInput>
  }

  export type ServiceCreateWithoutUserSegmentByIDInput = {
    id?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    type: string
    config?: NullableJsonNullValueInput | InputJsonValue
    name?: string | null
    Transformer?: TransformerCreateNestedManyWithoutServiceInput
    UserSegmentByPhone?: UserSegmentCreateNestedManyWithoutByPhoneInput
    UserSegmentAll?: UserSegmentCreateNestedManyWithoutAllInput
  }

  export type ServiceUncheckedCreateWithoutUserSegmentByIDInput = {
    id?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    type: string
    config?: NullableJsonNullValueInput | InputJsonValue
    name?: string | null
    Transformer?: TransformerUncheckedCreateNestedManyWithoutServiceInput
    UserSegmentByPhone?: UserSegmentUncheckedCreateNestedManyWithoutByPhoneInput
    UserSegmentAll?: UserSegmentUncheckedCreateNestedManyWithoutAllInput
  }

  export type ServiceCreateOrConnectWithoutUserSegmentByIDInput = {
    where: ServiceWhereUniqueInput
    create: XOR<ServiceCreateWithoutUserSegmentByIDInput, ServiceUncheckedCreateWithoutUserSegmentByIDInput>
  }

  export type ServiceCreateWithoutUserSegmentByPhoneInput = {
    id?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    type: string
    config?: NullableJsonNullValueInput | InputJsonValue
    name?: string | null
    Transformer?: TransformerCreateNestedManyWithoutServiceInput
    UserSegmentByID?: UserSegmentCreateNestedManyWithoutByIDInput
    UserSegmentAll?: UserSegmentCreateNestedManyWithoutAllInput
  }

  export type ServiceUncheckedCreateWithoutUserSegmentByPhoneInput = {
    id?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    type: string
    config?: NullableJsonNullValueInput | InputJsonValue
    name?: string | null
    Transformer?: TransformerUncheckedCreateNestedManyWithoutServiceInput
    UserSegmentByID?: UserSegmentUncheckedCreateNestedManyWithoutByIDInput
    UserSegmentAll?: UserSegmentUncheckedCreateNestedManyWithoutAllInput
  }

  export type ServiceCreateOrConnectWithoutUserSegmentByPhoneInput = {
    where: ServiceWhereUniqueInput
    create: XOR<ServiceCreateWithoutUserSegmentByPhoneInput, ServiceUncheckedCreateWithoutUserSegmentByPhoneInput>
  }

  export type BotCreateWithoutUsersInput = {
    id?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    name: string
    startingMessage: string
    logicIDs?: ConversationLogicCreateNestedManyWithoutBotsInput
    ownerID?: string | null
    ownerOrgID?: string | null
    purpose?: string | null
    description?: string | null
    startDate?: Date | string | null
    endDate?: Date | string | null
  }

  export type BotUncheckedCreateWithoutUsersInput = {
    id?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    name: string
    startingMessage: string
    logicIDs?: ConversationLogicUncheckedCreateNestedManyWithoutBotsInput
    ownerID?: string | null
    ownerOrgID?: string | null
    purpose?: string | null
    description?: string | null
    startDate?: Date | string | null
    endDate?: Date | string | null
  }

  export type BotCreateOrConnectWithoutUsersInput = {
    where: BotWhereUniqueInput
    create: XOR<BotCreateWithoutUsersInput, BotUncheckedCreateWithoutUsersInput>
  }

  export type ServiceUpsertWithoutUserSegmentAllInput = {
    update: XOR<ServiceUpdateWithoutUserSegmentAllInput, ServiceUncheckedUpdateWithoutUserSegmentAllInput>
    create: XOR<ServiceCreateWithoutUserSegmentAllInput, ServiceUncheckedCreateWithoutUserSegmentAllInput>
  }

  export type ServiceUpdateWithoutUserSegmentAllInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    type?: StringFieldUpdateOperationsInput | string
    config?: NullableJsonNullValueInput | InputJsonValue
    name?: NullableStringFieldUpdateOperationsInput | string | null
    Transformer?: TransformerUpdateManyWithoutServiceInput
    UserSegmentByID?: UserSegmentUpdateManyWithoutByIDInput
    UserSegmentByPhone?: UserSegmentUpdateManyWithoutByPhoneInput
  }

  export type ServiceUncheckedUpdateWithoutUserSegmentAllInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    type?: StringFieldUpdateOperationsInput | string
    config?: NullableJsonNullValueInput | InputJsonValue
    name?: NullableStringFieldUpdateOperationsInput | string | null
    Transformer?: TransformerUncheckedUpdateManyWithoutServiceInput
    UserSegmentByID?: UserSegmentUncheckedUpdateManyWithoutByIDInput
    UserSegmentByPhone?: UserSegmentUncheckedUpdateManyWithoutByPhoneInput
  }

  export type ServiceUpsertWithoutUserSegmentByIDInput = {
    update: XOR<ServiceUpdateWithoutUserSegmentByIDInput, ServiceUncheckedUpdateWithoutUserSegmentByIDInput>
    create: XOR<ServiceCreateWithoutUserSegmentByIDInput, ServiceUncheckedCreateWithoutUserSegmentByIDInput>
  }

  export type ServiceUpdateWithoutUserSegmentByIDInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    type?: StringFieldUpdateOperationsInput | string
    config?: NullableJsonNullValueInput | InputJsonValue
    name?: NullableStringFieldUpdateOperationsInput | string | null
    Transformer?: TransformerUpdateManyWithoutServiceInput
    UserSegmentByPhone?: UserSegmentUpdateManyWithoutByPhoneInput
    UserSegmentAll?: UserSegmentUpdateManyWithoutAllInput
  }

  export type ServiceUncheckedUpdateWithoutUserSegmentByIDInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    type?: StringFieldUpdateOperationsInput | string
    config?: NullableJsonNullValueInput | InputJsonValue
    name?: NullableStringFieldUpdateOperationsInput | string | null
    Transformer?: TransformerUncheckedUpdateManyWithoutServiceInput
    UserSegmentByPhone?: UserSegmentUncheckedUpdateManyWithoutByPhoneInput
    UserSegmentAll?: UserSegmentUncheckedUpdateManyWithoutAllInput
  }

  export type ServiceUpsertWithoutUserSegmentByPhoneInput = {
    update: XOR<ServiceUpdateWithoutUserSegmentByPhoneInput, ServiceUncheckedUpdateWithoutUserSegmentByPhoneInput>
    create: XOR<ServiceCreateWithoutUserSegmentByPhoneInput, ServiceUncheckedCreateWithoutUserSegmentByPhoneInput>
  }

  export type ServiceUpdateWithoutUserSegmentByPhoneInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    type?: StringFieldUpdateOperationsInput | string
    config?: NullableJsonNullValueInput | InputJsonValue
    name?: NullableStringFieldUpdateOperationsInput | string | null
    Transformer?: TransformerUpdateManyWithoutServiceInput
    UserSegmentByID?: UserSegmentUpdateManyWithoutByIDInput
    UserSegmentAll?: UserSegmentUpdateManyWithoutAllInput
  }

  export type ServiceUncheckedUpdateWithoutUserSegmentByPhoneInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    type?: StringFieldUpdateOperationsInput | string
    config?: NullableJsonNullValueInput | InputJsonValue
    name?: NullableStringFieldUpdateOperationsInput | string | null
    Transformer?: TransformerUncheckedUpdateManyWithoutServiceInput
    UserSegmentByID?: UserSegmentUncheckedUpdateManyWithoutByIDInput
    UserSegmentAll?: UserSegmentUncheckedUpdateManyWithoutAllInput
  }

  export type BotUpsertWithWhereUniqueWithoutUsersInput = {
    where: BotWhereUniqueInput
    update: XOR<BotUpdateWithoutUsersInput, BotUncheckedUpdateWithoutUsersInput>
    create: XOR<BotCreateWithoutUsersInput, BotUncheckedCreateWithoutUsersInput>
  }

  export type BotUpdateWithWhereUniqueWithoutUsersInput = {
    where: BotWhereUniqueInput
    data: XOR<BotUpdateWithoutUsersInput, BotUncheckedUpdateWithoutUsersInput>
  }

  export type BotUpdateManyWithWhereWithoutUsersInput = {
    where: BotScalarWhereInput
    data: XOR<BotUpdateManyMutationInput, BotUncheckedUpdateManyWithoutBotsInput>
  }

  export type BotScalarWhereInput = {
    AND?: Enumerable<BotScalarWhereInput>
    OR?: Enumerable<BotScalarWhereInput>
    NOT?: Enumerable<BotScalarWhereInput>
    id?: StringFilter | string
    createdAt?: DateTimeFilter | Date | string
    updatedAt?: DateTimeFilter | Date | string
    name?: StringFilter | string
    startingMessage?: StringFilter | string
    ownerID?: StringNullableFilter | string | null
    ownerOrgID?: StringNullableFilter | string | null
    purpose?: StringNullableFilter | string | null
    description?: StringNullableFilter | string | null
    startDate?: DateTimeNullableFilter | Date | string | null
    endDate?: DateTimeNullableFilter | Date | string | null
  }

  export type AdapterCreateWithoutConversationLogicInput = {
    id?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    channel: string
    provider: string
    config: JsonNullValueInput | InputJsonValue
    name: string
  }

  export type AdapterUncheckedCreateWithoutConversationLogicInput = {
    id?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    channel: string
    provider: string
    config: JsonNullValueInput | InputJsonValue
    name: string
  }

  export type AdapterCreateOrConnectWithoutConversationLogicInput = {
    where: AdapterWhereUniqueInput
    create: XOR<AdapterCreateWithoutConversationLogicInput, AdapterUncheckedCreateWithoutConversationLogicInput>
  }

  export type BotCreateWithoutLogicIDsInput = {
    id?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    name: string
    startingMessage: string
    users?: UserSegmentCreateNestedManyWithoutBotsInput
    ownerID?: string | null
    ownerOrgID?: string | null
    purpose?: string | null
    description?: string | null
    startDate?: Date | string | null
    endDate?: Date | string | null
  }

  export type BotUncheckedCreateWithoutLogicIDsInput = {
    id?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    name: string
    startingMessage: string
    users?: UserSegmentUncheckedCreateNestedManyWithoutBotsInput
    ownerID?: string | null
    ownerOrgID?: string | null
    purpose?: string | null
    description?: string | null
    startDate?: Date | string | null
    endDate?: Date | string | null
  }

  export type BotCreateOrConnectWithoutLogicIDsInput = {
    where: BotWhereUniqueInput
    create: XOR<BotCreateWithoutLogicIDsInput, BotUncheckedCreateWithoutLogicIDsInput>
  }

  export type TransformerConfigCreateWithoutConversationLogicInput = {
    id?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    meta: JsonNullValueInput | InputJsonValue
    transformer: TransformerCreateNestedOneWithoutTranformerConfigInput
  }

  export type TransformerConfigUncheckedCreateWithoutConversationLogicInput = {
    id?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    meta: JsonNullValueInput | InputJsonValue
    transformerId: string
  }

  export type TransformerConfigCreateOrConnectWithoutConversationLogicInput = {
    where: TransformerConfigWhereUniqueInput
    create: XOR<TransformerConfigCreateWithoutConversationLogicInput, TransformerConfigUncheckedCreateWithoutConversationLogicInput>
  }

  export type TransformerConfigCreateManyConversationLogicInputEnvelope = {
    data: Enumerable<TransformerConfigCreateManyConversationLogicInput>
    skipDuplicates?: boolean
  }

  export type AdapterUpsertWithoutConversationLogicInput = {
    update: XOR<AdapterUpdateWithoutConversationLogicInput, AdapterUncheckedUpdateWithoutConversationLogicInput>
    create: XOR<AdapterCreateWithoutConversationLogicInput, AdapterUncheckedCreateWithoutConversationLogicInput>
  }

  export type AdapterUpdateWithoutConversationLogicInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    channel?: StringFieldUpdateOperationsInput | string
    provider?: StringFieldUpdateOperationsInput | string
    config?: JsonNullValueInput | InputJsonValue
    name?: StringFieldUpdateOperationsInput | string
  }

  export type AdapterUncheckedUpdateWithoutConversationLogicInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    channel?: StringFieldUpdateOperationsInput | string
    provider?: StringFieldUpdateOperationsInput | string
    config?: JsonNullValueInput | InputJsonValue
    name?: StringFieldUpdateOperationsInput | string
  }

  export type BotUpsertWithWhereUniqueWithoutLogicIDsInput = {
    where: BotWhereUniqueInput
    update: XOR<BotUpdateWithoutLogicIDsInput, BotUncheckedUpdateWithoutLogicIDsInput>
    create: XOR<BotCreateWithoutLogicIDsInput, BotUncheckedCreateWithoutLogicIDsInput>
  }

  export type BotUpdateWithWhereUniqueWithoutLogicIDsInput = {
    where: BotWhereUniqueInput
    data: XOR<BotUpdateWithoutLogicIDsInput, BotUncheckedUpdateWithoutLogicIDsInput>
  }

  export type BotUpdateManyWithWhereWithoutLogicIDsInput = {
    where: BotScalarWhereInput
    data: XOR<BotUpdateManyMutationInput, BotUncheckedUpdateManyWithoutBotsInput>
  }

  export type TransformerConfigUpsertWithWhereUniqueWithoutConversationLogicInput = {
    where: TransformerConfigWhereUniqueInput
    update: XOR<TransformerConfigUpdateWithoutConversationLogicInput, TransformerConfigUncheckedUpdateWithoutConversationLogicInput>
    create: XOR<TransformerConfigCreateWithoutConversationLogicInput, TransformerConfigUncheckedCreateWithoutConversationLogicInput>
  }

  export type TransformerConfigUpdateWithWhereUniqueWithoutConversationLogicInput = {
    where: TransformerConfigWhereUniqueInput
    data: XOR<TransformerConfigUpdateWithoutConversationLogicInput, TransformerConfigUncheckedUpdateWithoutConversationLogicInput>
  }

  export type TransformerConfigUpdateManyWithWhereWithoutConversationLogicInput = {
    where: TransformerConfigScalarWhereInput
    data: XOR<TransformerConfigUpdateManyMutationInput, TransformerConfigUncheckedUpdateManyWithoutTransformersInput>
  }

  export type ConversationLogicCreateManyAdapterInput = {
    id?: string
    name: string
    createdAt?: Date | string
    updatedAt?: Date | string
    description?: string | null
  }

  export type ConversationLogicUpdateWithoutAdapterInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    bots?: BotUpdateManyWithoutLogicIDsInput
    transformers?: TransformerConfigUpdateManyWithoutConversationLogicInput
  }

  export type ConversationLogicUncheckedUpdateWithoutAdapterInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    bots?: BotUncheckedUpdateManyWithoutLogicIDsInput
    transformers?: TransformerConfigUncheckedUpdateManyWithoutConversationLogicInput
  }

  export type ConversationLogicUncheckedUpdateManyWithoutConversationLogicInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type TransformerCreateManyServiceInput = {
    id?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    name: string
    tags?: TransformerCreatetagsInput | Enumerable<string>
    config: JsonNullValueInput | InputJsonValue
  }

  export type UserSegmentCreateManyByIDInput = {
    id?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    name: string
    description?: string | null
    count?: number
    category?: string | null
    allServiceID?: string | null
    byPhoneServiceID?: string | null
    botId?: string | null
  }

  export type UserSegmentCreateManyByPhoneInput = {
    id?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    name: string
    description?: string | null
    count?: number
    category?: string | null
    allServiceID?: string | null
    byIDServiceID?: string | null
    botId?: string | null
  }

  export type UserSegmentCreateManyAllInput = {
    id?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    name: string
    description?: string | null
    count?: number
    category?: string | null
    byPhoneServiceID?: string | null
    byIDServiceID?: string | null
    botId?: string | null
  }

  export type TransformerUpdateWithoutServiceInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    name?: StringFieldUpdateOperationsInput | string
    tags?: TransformerUpdatetagsInput | Enumerable<string>
    config?: JsonNullValueInput | InputJsonValue
    TranformerConfig?: TransformerConfigUpdateManyWithoutTransformerInput
  }

  export type TransformerUncheckedUpdateWithoutServiceInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    name?: StringFieldUpdateOperationsInput | string
    tags?: TransformerUpdatetagsInput | Enumerable<string>
    config?: JsonNullValueInput | InputJsonValue
    TranformerConfig?: TransformerConfigUncheckedUpdateManyWithoutTransformerInput
  }

  export type TransformerUncheckedUpdateManyWithoutTransformerInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    name?: StringFieldUpdateOperationsInput | string
    tags?: TransformerUpdatetagsInput | Enumerable<string>
    config?: JsonNullValueInput | InputJsonValue
  }

  export type UserSegmentUpdateWithoutByIDInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    count?: IntFieldUpdateOperationsInput | number
    category?: NullableStringFieldUpdateOperationsInput | string | null
    all?: ServiceUpdateOneWithoutUserSegmentAllInput
    byPhone?: ServiceUpdateOneWithoutUserSegmentByPhoneInput
    bots?: BotUpdateManyWithoutUsersInput
    botId?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type UserSegmentUncheckedUpdateWithoutByIDInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    count?: IntFieldUpdateOperationsInput | number
    category?: NullableStringFieldUpdateOperationsInput | string | null
    allServiceID?: NullableStringFieldUpdateOperationsInput | string | null
    byPhoneServiceID?: NullableStringFieldUpdateOperationsInput | string | null
    bots?: BotUncheckedUpdateManyWithoutUsersInput
    botId?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type UserSegmentUncheckedUpdateManyWithoutUserSegmentByIDInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    count?: IntFieldUpdateOperationsInput | number
    category?: NullableStringFieldUpdateOperationsInput | string | null
    allServiceID?: NullableStringFieldUpdateOperationsInput | string | null
    byPhoneServiceID?: NullableStringFieldUpdateOperationsInput | string | null
    botId?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type UserSegmentUpdateWithoutByPhoneInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    count?: IntFieldUpdateOperationsInput | number
    category?: NullableStringFieldUpdateOperationsInput | string | null
    all?: ServiceUpdateOneWithoutUserSegmentAllInput
    byID?: ServiceUpdateOneWithoutUserSegmentByIDInput
    bots?: BotUpdateManyWithoutUsersInput
    botId?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type UserSegmentUncheckedUpdateWithoutByPhoneInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    count?: IntFieldUpdateOperationsInput | number
    category?: NullableStringFieldUpdateOperationsInput | string | null
    allServiceID?: NullableStringFieldUpdateOperationsInput | string | null
    byIDServiceID?: NullableStringFieldUpdateOperationsInput | string | null
    bots?: BotUncheckedUpdateManyWithoutUsersInput
    botId?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type UserSegmentUncheckedUpdateManyWithoutUserSegmentByPhoneInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    count?: IntFieldUpdateOperationsInput | number
    category?: NullableStringFieldUpdateOperationsInput | string | null
    allServiceID?: NullableStringFieldUpdateOperationsInput | string | null
    byIDServiceID?: NullableStringFieldUpdateOperationsInput | string | null
    botId?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type UserSegmentUpdateWithoutAllInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    count?: IntFieldUpdateOperationsInput | number
    category?: NullableStringFieldUpdateOperationsInput | string | null
    byID?: ServiceUpdateOneWithoutUserSegmentByIDInput
    byPhone?: ServiceUpdateOneWithoutUserSegmentByPhoneInput
    bots?: BotUpdateManyWithoutUsersInput
    botId?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type UserSegmentUncheckedUpdateWithoutAllInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    count?: IntFieldUpdateOperationsInput | number
    category?: NullableStringFieldUpdateOperationsInput | string | null
    byPhoneServiceID?: NullableStringFieldUpdateOperationsInput | string | null
    byIDServiceID?: NullableStringFieldUpdateOperationsInput | string | null
    bots?: BotUncheckedUpdateManyWithoutUsersInput
    botId?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type UserSegmentUncheckedUpdateManyWithoutUserSegmentAllInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    count?: IntFieldUpdateOperationsInput | number
    category?: NullableStringFieldUpdateOperationsInput | string | null
    byPhoneServiceID?: NullableStringFieldUpdateOperationsInput | string | null
    byIDServiceID?: NullableStringFieldUpdateOperationsInput | string | null
    botId?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type TransformerConfigCreateManyTransformerInput = {
    id?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    meta: JsonNullValueInput | InputJsonValue
    conversationLogicId?: string | null
  }

  export type TransformerConfigUpdateWithoutTransformerInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    meta?: JsonNullValueInput | InputJsonValue
    ConversationLogic?: ConversationLogicUpdateOneWithoutTransformersInput
  }

  export type TransformerConfigUncheckedUpdateWithoutTransformerInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    meta?: JsonNullValueInput | InputJsonValue
    conversationLogicId?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type TransformerConfigUncheckedUpdateManyWithoutTranformerConfigInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    meta?: JsonNullValueInput | InputJsonValue
    conversationLogicId?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type UserSegmentUpdateWithoutBotsInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    count?: IntFieldUpdateOperationsInput | number
    category?: NullableStringFieldUpdateOperationsInput | string | null
    all?: ServiceUpdateOneWithoutUserSegmentAllInput
    byID?: ServiceUpdateOneWithoutUserSegmentByIDInput
    byPhone?: ServiceUpdateOneWithoutUserSegmentByPhoneInput
    botId?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type UserSegmentUncheckedUpdateWithoutBotsInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    count?: IntFieldUpdateOperationsInput | number
    category?: NullableStringFieldUpdateOperationsInput | string | null
    allServiceID?: NullableStringFieldUpdateOperationsInput | string | null
    byPhoneServiceID?: NullableStringFieldUpdateOperationsInput | string | null
    byIDServiceID?: NullableStringFieldUpdateOperationsInput | string | null
    botId?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type UserSegmentUncheckedUpdateManyWithoutUsersInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    count?: IntFieldUpdateOperationsInput | number
    category?: NullableStringFieldUpdateOperationsInput | string | null
    allServiceID?: NullableStringFieldUpdateOperationsInput | string | null
    byPhoneServiceID?: NullableStringFieldUpdateOperationsInput | string | null
    byIDServiceID?: NullableStringFieldUpdateOperationsInput | string | null
    botId?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type ConversationLogicUpdateWithoutBotsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    adapter?: AdapterUpdateOneRequiredWithoutConversationLogicInput
    transformers?: TransformerConfigUpdateManyWithoutConversationLogicInput
  }

  export type ConversationLogicUncheckedUpdateWithoutBotsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    adapterId?: StringFieldUpdateOperationsInput | string
    transformers?: TransformerConfigUncheckedUpdateManyWithoutConversationLogicInput
  }

  export type ConversationLogicUncheckedUpdateManyWithoutLogicIDsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    adapterId?: StringFieldUpdateOperationsInput | string
  }

  export type BotUpdateWithoutUsersInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    name?: StringFieldUpdateOperationsInput | string
    startingMessage?: StringFieldUpdateOperationsInput | string
    logicIDs?: ConversationLogicUpdateManyWithoutBotsInput
    ownerID?: NullableStringFieldUpdateOperationsInput | string | null
    ownerOrgID?: NullableStringFieldUpdateOperationsInput | string | null
    purpose?: NullableStringFieldUpdateOperationsInput | string | null
    description?: NullableStringFieldUpdateOperationsInput | string | null
    startDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    endDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type BotUncheckedUpdateWithoutUsersInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    name?: StringFieldUpdateOperationsInput | string
    startingMessage?: StringFieldUpdateOperationsInput | string
    logicIDs?: ConversationLogicUncheckedUpdateManyWithoutBotsInput
    ownerID?: NullableStringFieldUpdateOperationsInput | string | null
    ownerOrgID?: NullableStringFieldUpdateOperationsInput | string | null
    purpose?: NullableStringFieldUpdateOperationsInput | string | null
    description?: NullableStringFieldUpdateOperationsInput | string | null
    startDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    endDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type BotUncheckedUpdateManyWithoutBotsInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    name?: StringFieldUpdateOperationsInput | string
    startingMessage?: StringFieldUpdateOperationsInput | string
    ownerID?: NullableStringFieldUpdateOperationsInput | string | null
    ownerOrgID?: NullableStringFieldUpdateOperationsInput | string | null
    purpose?: NullableStringFieldUpdateOperationsInput | string | null
    description?: NullableStringFieldUpdateOperationsInput | string | null
    startDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    endDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type TransformerConfigCreateManyConversationLogicInput = {
    id?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    meta: JsonNullValueInput | InputJsonValue
    transformerId: string
  }

  export type BotUpdateWithoutLogicIDsInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    name?: StringFieldUpdateOperationsInput | string
    startingMessage?: StringFieldUpdateOperationsInput | string
    users?: UserSegmentUpdateManyWithoutBotsInput
    ownerID?: NullableStringFieldUpdateOperationsInput | string | null
    ownerOrgID?: NullableStringFieldUpdateOperationsInput | string | null
    purpose?: NullableStringFieldUpdateOperationsInput | string | null
    description?: NullableStringFieldUpdateOperationsInput | string | null
    startDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    endDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type BotUncheckedUpdateWithoutLogicIDsInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    name?: StringFieldUpdateOperationsInput | string
    startingMessage?: StringFieldUpdateOperationsInput | string
    users?: UserSegmentUncheckedUpdateManyWithoutBotsInput
    ownerID?: NullableStringFieldUpdateOperationsInput | string | null
    ownerOrgID?: NullableStringFieldUpdateOperationsInput | string | null
    purpose?: NullableStringFieldUpdateOperationsInput | string | null
    description?: NullableStringFieldUpdateOperationsInput | string | null
    startDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    endDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type TransformerConfigUpdateWithoutConversationLogicInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    meta?: JsonNullValueInput | InputJsonValue
    transformer?: TransformerUpdateOneRequiredWithoutTranformerConfigInput
  }

  export type TransformerConfigUncheckedUpdateWithoutConversationLogicInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    meta?: JsonNullValueInput | InputJsonValue
    transformerId?: StringFieldUpdateOperationsInput | string
  }

  export type TransformerConfigUncheckedUpdateManyWithoutTransformersInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    meta?: JsonNullValueInput | InputJsonValue
    transformerId?: StringFieldUpdateOperationsInput | string
  }



  /**
   * Batch Payload for updateMany & deleteMany & createMany
   */

  export type BatchPayload = {
    count: number
  }

  /**
   * DMMF
   */
  export const dmmf: runtime.DMMF.Document;
}