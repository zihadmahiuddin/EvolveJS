import Role from './Role';
import Emoji from './Emoji';
import Channel from './Channel';
import VoiceState from './VoiceState';
import GuildMember from './GuildMember';
import PresenceUpdate from './PresenceUpdate';
import { Objex } from '@evolvejs/objex';
import { Snowflake } from '../Constants/Constants';
export default class {
    id: Snowflake;
    name: string;
    icon: string;
    splash: string | null;
    discoverySplash: string | null;
    owner: boolean | undefined;
    ownerID: string;
    permissions: number | undefined;
    region: string;
    afkChannel: Channel | null;
    afkTimeout: number;
    verificationLevel: number;
    defMessageNotify: number;
    explicitContentFilter: number;
    mfaLevel: number;
    applicationID: Snowflake | null;
    widgetEnabled: boolean | undefined;
    widgetChannel: Channel | null | undefined;
    systemChannel: Channel | null | undefined;
    systemChannelFlag: number;
    rulesChannel: Channel | null;
    joinedAt: number | undefined;
    large: boolean | undefined;
    unavailable: boolean | undefined;
    memberCount: number | undefined;
    maxPresences: number | null | undefined;
    maxMembers: number | undefined;
    vanityCode: string | null;
    description: string | null;
    banner: string | null;
    premiumTier: number;
    premiumSubCount: number | undefined;
    preferredlocale: string;
    updatesChannel: Channel | undefined;
    maxChannelUsers: number | undefined;
    approxMemberCount: number | undefined;
    approxPresenceCount: number | undefined;
    members: Objex<Snowflake, GuildMember>;
    channels: Objex<Snowflake, Channel>;
    roles: Objex<Snowflake, Role>;
    emojis: Objex<Snowflake, Emoji>;
    voiceStates: Objex<Snowflake, VoiceState>;
    presences: Objex<Snowflake, PresenceUpdate>;
    features: Array<string>;
    constructor(id: Snowflake, name: string, icon: string, splash: string | null, discoverySplash: string | null, owner: boolean | undefined, ownerID: string, permissions: number | undefined, region: string, afkChannel: Channel | null, afkTimeout: number, verificationLevel: number, defMessageNotify: number, explicitContentFilter: number, mfaLevel: number, applicationID: Snowflake | null, widgetEnabled: boolean | undefined, widgetChannel: Channel | null | undefined, systemChannel: Channel | null | undefined, systemChannelFlag: number, rulesChannel: Channel | null, joinedAt: number | undefined, large: boolean | undefined, unavailable: boolean | undefined, memberCount: number | undefined, maxPresences: number | null | undefined, maxMembers: number | undefined, vanityCode: string | null, description: string | null, banner: string | null, premiumTier: number, premiumSubCount: number | undefined, preferredlocale: string, updatesChannel: Channel | undefined, maxChannelUsers: number | undefined, approxMemberCount: number | undefined, approxPresenceCount: number | undefined);
}