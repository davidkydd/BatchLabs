import { Injectable, NgZone } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";
// tslint:disable-next-line:no-var-requires
const stripJsonComments = require("strip-json-comments");

import { KeyBindings, Settings, defaultKeybindings } from "app/models";
import { LocalFileStorage } from "app/services";
import { log } from "app/utils";

// tslint:disable-next-line:no-var-requires
const defaultSettings = JSON.parse(stripJsonComments(require("app/components/settings/default-settings.json")));

@Injectable()
export class SettingsService {
    public settingsObs: Observable<Settings>;
    public keybindings: Observable<KeyBindings[]>;

    public hasSettingsLoaded: Observable<boolean>;
    public settings: Settings;
    public userSettingsStr: string;

    private _hasSettingsLoaded = new BehaviorSubject<boolean>(false);
    private _settingsSubject = new BehaviorSubject<Settings>(null);
    private _keybindings = new BehaviorSubject<KeyBindings[]>(null);

    private _filename = "settings";
    private _keybindingsFilename = "keybindings";

    constructor(private zone: NgZone, private storage: LocalFileStorage) {
        this.settingsObs = this._settingsSubject.asObservable();
        this.keybindings = this._keybindings.asObservable();
        this.hasSettingsLoaded = this._hasSettingsLoaded.asObservable();
    }

    public init() {
        this.loadSettings();
    }

    public saveUserSettings(userSettings: string): Observable<any> {
        this.userSettingsStr = userSettings;
        this.settings = { ...defaultSettings, ...this._parseUserSettings(userSettings) };
        this._settingsSubject.next(this.settings);
        return this.storage.write(this._filename, userSettings);
    }

    private loadSettings() {
        this.storage.read(this._filename).catch(() => {
            return null;
        }).subscribe((userSettings: string) => {
            this.userSettingsStr = userSettings;
            this.settings = { ...defaultSettings, ...this._parseUserSettings(userSettings) };
            this._hasSettingsLoaded.next(true);
            this._settingsSubject.next(this.settings);
        });

        this.storage.get(this._keybindingsFilename).subscribe((data: KeyBindings[]) => {
            this.zone.run(() => {
                // If the file has never been init create it
                if (!Array.isArray(data)) {
                    this.storage.set(this._keybindingsFilename, []).catch((e) => {
                        log.error("Error saving the initial keybinding settings.", e);
                        return null;
                    }).subscribe();
                }
                this._keybindings.next(defaultKeybindings.concat(data));
            });
        });
    }

    private _parseUserSettings(value: string): Partial<Settings> {
        if (!value) {
            return {};
        }

        try {
            return JSON.parse(stripJsonComments(value));
        } catch (e) {
            return {};
        }
    }
}
