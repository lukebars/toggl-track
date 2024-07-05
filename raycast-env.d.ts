/// <reference types="@raycast/api">

/* 🚧 🚧 🚧
 * This file is auto-generated from the extension's manifest.
 * Do not modify manually. Instead, update the `package.json` file.
 * 🚧 🚧 🚧 */

/* eslint-disable @typescript-eslint/ban-types */

type ExtensionPreferences = {
  /** Toggl API Token - The API token for your Toggl account. */
  "togglApiToken": string
}

/** Preferences accessible in all the extension's commands */
declare type Preferences = ExtensionPreferences

declare namespace Preferences {
  /** Preferences accessible in the `index` command */
  export type Index = ExtensionPreferences & {}
  /** Preferences accessible in the `manageWorkspaces` command */
  export type ManageWorkspaces = ExtensionPreferences & {}
  /** Preferences accessible in the `manageTags` command */
  export type ManageTags = ExtensionPreferences & {}
  /** Preferences accessible in the `manageClients` command */
  export type ManageClients = ExtensionPreferences & {}
  /** Preferences accessible in the `menuBar` command */
  export type MenuBar = ExtensionPreferences & {
  /** Show Running Entry Title in Menu Bar - Whether or not to show the entry title in the menu bar. */
  "showTitleInMenuBar": boolean,
  /** Show Running Entry Time in Menu Bar - Whether or not to show the entry timer in the menu bar. */
  "showTimeInMenuBar": boolean,
  /** Show Running Entry Project in Menu Bar - Whether or not to show the entry project in the menu bar. */
  "showProjectInMenuBar": boolean,
  /** Show Running Entry Client in Menu Bar - Whether or not to show the entry client in the menu bar. */
  "showClientInMenuBar": boolean
}
  /** Preferences accessible in the `manageProjects` command */
  export type ManageProjects = ExtensionPreferences & {}
}

declare namespace Arguments {
  /** Arguments passed to the `index` command */
  export type Index = {}
  /** Arguments passed to the `manageWorkspaces` command */
  export type ManageWorkspaces = {}
  /** Arguments passed to the `manageTags` command */
  export type ManageTags = {}
  /** Arguments passed to the `manageClients` command */
  export type ManageClients = {}
  /** Arguments passed to the `menuBar` command */
  export type MenuBar = {}
  /** Arguments passed to the `manageProjects` command */
  export type ManageProjects = {}
}

