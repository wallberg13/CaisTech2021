const { knex } = require("../databases");

const {
  ontsRepository,
  oltScriptsRepository,
  oltsRepository,
  oltSlotsRepository,
  oltAutoFindRepository,
  slotPortsRepository,
  slotPortDefaultFieldsRepository,
} = knex;

module.exports = async () => {
  const olt = oltsRepository;
  const script = oltScriptsRepository;
  const slots = oltSlotsRepository;
  const slotPorts = slotPortsRepository;
  const ont = ontsRepository;
  const autoFind = oltAutoFindRepository;

  const defaultFields = slotPortDefaultFieldsRepository;

  try {
    const x = await defaultFields.findByOLTOrSlotPort(
      {
        olt_id: undefined,
        slot_port_id: undefined,
      },
      [
        "vlan_data",
        "vlan_voice",
        "gem_data",
        "gem_voice",
        "line_profile",
        "service_profile",
      ]
    );
    console.log(x);
  } catch (e) {
    console.log(e);
  }
};
