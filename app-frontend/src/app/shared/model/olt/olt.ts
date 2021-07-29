import { MultiOption } from '../../components/MyMultiSelectField';

export class Olt {
    id: number;
    host: string;
    port: number;
    user: string;
    hostname: string;
    snmp_community: string;
    olt_model_id: number;
    model: string;
    software_version: string;
    hardware_length: number;
    description: string;
    code: string;
    olt_model: string;
    active: number;
    onts_online: number;
    onts_offline: number;
    onts_total: number;
    min_run_state_last_update: Date;
    max_run_state_last_update: Date;
    empty_slot_ports: number;
    total_slot_ports: number;
    empty_slots: number;
    total_slots: number;

    constructor(
        id: number,
        host: string,
        port: number,
        user: string,
        hostname: string,
        snmp_community: string,
        olt_model_id: number,
        model: string,
        software_version: string,
        hardware_length: number,
        description: string,
        code: string,
        olt_model: string,
        active: number,
        onts_online: number,
        onts_offline: number,
        onts_total: number,
        min_run_state_last_update: Date,
        max_run_state_last_update: Date,
        empty_slot_ports: number,
        total_slot_ports: number,
        empty_slots: number,
        total_slots: number,
    ) {
        this.id = id;
        this.host = host;
        this.port = port;
        this.user = user;
        this.hostname = hostname;
        this.snmp_community = snmp_community;
        this.olt_model_id = olt_model_id;
        this.model = model;
        this.software_version = software_version;
        this.hardware_length = hardware_length;
        this.description = description;
        this.code = code;
        this.olt_model = olt_model;
        this.active = active;
        this.onts_online = onts_online;
        this.onts_offline = onts_offline;
        this.onts_total = onts_total;
        this.min_run_state_last_update = min_run_state_last_update;
        this.max_run_state_last_update = max_run_state_last_update;
        this.empty_slot_ports = empty_slot_ports;
        this.total_slot_ports = total_slot_ports;
        this.empty_slots = empty_slots;
        this.total_slots = total_slots;
    }

    static fromJson(data: any): Olt {
        return new Olt(
            data.id,
            data.host,
            data.port,
            data.user,
            data.hostname,
            data.snmp_community,
            data.olt_model_id,
            data.model,
            data.software_version,
            data.hardware_length,
            data.description,
            data.code,
            data.olt_model,
            data.active,
            data.onts_online,
            data.onts_offline,
            data.onts_total,
            data.min_run_state_last_update,
            data.max_run_state_last_update,
            data.empty_slot_ports,
            data.total_slot_ports,
            data.empty_slots,
            data.total_slots,
        );
    }

    static fromPermission(data: any): MultiOption {
        return {
            value: data.id,
            label: data.hostname,
        };
    }
}
