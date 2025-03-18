export type StringKey<T> = T extends number ? `${T}` : T extends string ? T : never;
export type KeyOf<T>     = StringKey<keyof T>;

export type ValueOf<T, K extends keyof T = keyof T> = Required<T>[K];
export type ValuesOf<T, K extends [...(keyof T)[]] = (keyof T)[]> = {
	[P in keyof K]: K[P] extends keyof T ? ValueOf<T, K[P]> : never;
};

export type EntryOf<T, K extends keyof T = keyof T> = [K, ValueOf<T, K>];
export type EntriesOf<T, K extends [...(keyof T)[]] = (keyof T)[]> = {
	[P in keyof K]: K[P] extends keyof T ? EntryOf<T, K[P]> : never;
}

export type TypedPropertyDescriptorMap<T> = {
	[K in keyof T]: TypedPropertyDescriptor<T[K]>;
};

export interface TypedObject {
	getOwnPropertyNames<T>(o: T): KeyOf<T>[];

	keys<T>   (o: T): KeyOf<T>[];
	values<T> (o: T): ValuesOf<T>;
	entries<T>(o: T): EntriesOf<T>;
	fromEntries<K extends keyof any, V>(entries: Iterable<readonly [K, V]>): Record<K, V>;

	create<T>(prototype: object, properties: TypedPropertyDescriptorMap<T>): T;

	recreate<T, U>(
		o  : T,
		fn : <K extends keyof T>(
			key      : K,
			property : TypedPropertyDescriptor<T[K]>
		) => [K, TypedPropertyDescriptor<U>]
	): Record<keyof T, U>;

	transform<T, K extends keyof any, V>(
		o  : T,
		fn : (key: KeyOf<T>, value: T[keyof T]) => readonly [K, V]
	): Record<K, V>;

	toMap<T extends {}, K = KeyOf<T>, V = T[keyof T]>(
		o          : T,
		transform? : (key: KeyOf<T>, value: T[keyof T]) => readonly [K, V]
	): Map<K, V>;
}

export const TypedObject = Object.freeze({
	getOwnPropertyNames : Object.getOwnPropertyNames,
	keys                : Object.keys,
	values              : Object.values,
	entries             : Object.entries,
	fromEntries         : Object.fromEntries,
	create              : Object.create,

	recreate<T, U>(
		o  : T,
		fn : <K extends keyof T>(
			key      : K,
			property : TypedPropertyDescriptor<T[K]>
		) => [K, TypedPropertyDescriptor<U>]
	): Record<keyof T, U> {
		return Object.create(
			Object.getPrototypeOf(o),
			TypedObject.transform(Object.getOwnPropertyDescriptors(o), fn as any)
		) as any;
	},

	transform<T, K extends keyof any, V>(
		o  : T,
		fn : (key: KeyOf<T>, value: T[keyof T]) => readonly [K, V]
	): Record<K, V> {
		return TypedObject.fromEntries(
			TypedObject.entries(o).map(([key, value]) => fn(key as any, value))
		);
	},

	toMap<T extends {}, K = KeyOf<T>, V = T[keyof T]>(
		o          : T,
		transform? : (key: KeyOf<T>, value: T[keyof T]) => readonly [K, V]
	): Map<K, V> {
		const entries = transform
			? TypedObject.entries(o).map(([key, value]) => transform(key as any, value))
			: TypedObject.entries(o);

		const map = new Map<K, V>();
		for (const [key, value] of entries)
			map.set(key as K, value as V);

		return map;
	},
}) as TypedObject;