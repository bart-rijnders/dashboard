<script>
import Network from '@/edit/kubevirt.io.virtualmachine/VirtualMachineNetwork';
import VM_MIXIN from '@/mixins/harvester-vm';

export default {
  name:       'Networks',
  components: { Network },
  mixins:     [VM_MIXIN],

  props: {
    value: {
      type:     Object,
      required: true,
    }
  },

  data() {
    return { spec: this.value.spec };
  },

  watch: {
    value: {
      handler(neu) {
        this.$set(this, 'spec', this.value.spec);
      },
      deep: true
    },
  },
};
</script>

<template>
  <div class="vm-inventory">
    <Network v-model="networkRows" mode="view" />
  </div>
</template>
