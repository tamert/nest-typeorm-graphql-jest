/**
 * This type should be used in any interfaces where the value is to be
 * localized into different languages.
 */
export type LocaleString = string & { _opaqueType: 'LocaleString' };

export type TranslatableKeys<T> = { [K in keyof T]: T[K] extends LocaleString ? K : never }[keyof T];

export type NonTranslateableKeys<T> = { [K in keyof T]: T[K] extends LocaleString ? never : K }[keyof T];

/**
 * Entities which have localizable string properties should implement this type.
 */
export type Translatable<T> =
    // Translatable must include all non-translatable keys of the interface
    { [K in NonTranslateableKeys<T>]: T[K] } &
        // Translatable must not include any translatable keys (these are instead handled by the Translation)
        {
            [K in TranslatableKeys<T>]?: never;
        } & { translations: Translation<T>[] }; // Translatable must include a reference to all translations of the translatable keys

/**
 * Translations of localizable entities should implement this type.
 */
export type Translation<T> = {
    locale: string;
    base: Translatable<T>;
} & { [K in TranslatableKeys<T>]: string }; // Translation must include all translatable keys as a string type

/**
 * Converts a Translatable entity into the public-facing entity by unwrapping
 * the translated strings from the first of the Translation entities.
 */
export function translate<T>(translatable: Translatable<T>): T {
    const translation = translatable.translations[0];

    const translated = { ...(translatable as any) };
    delete translated.translations;

    for (const [key, value] of Object.entries(translation)) {
        if (key !== 'locale' && key !== 'id') {
            translated[key] = value;
        }
    }
    return translated;
}
