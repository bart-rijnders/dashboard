<script>
import capitalize from 'lodash/capitalize';
import CountBox from '@/components/CountBox';
import { STATES } from '@/plugins/steve/resource-class';

export default {
  components: { CountBox },

  props: {
    value: {
      type:     Object,
      required: true,
    },

    stateKey: {
      type:    String,
      default: 'fleet.fleetSummary.state'
    }
  },

  computed: {
    counts() {
      const out = {
        ready: {
          count: 0,
          color: 'success',
          label: this.$store.getters['i18n/withFallback'](`${ this.stateKey }.success`, null, 'Success')
        },
        info:    {
          count: 0,
          color: 'info',
          label: this.$store.getters['i18n/withFallback'](`${ this.stateKey }.info`, null, 'Info')

        },
        warning: {
          count: 0,
          color: 'warning',
          label: this.$store.getters['i18n/withFallback'](`${ this.stateKey }.warning`, null, 'Warning')

        },
        error:   {
          count: 0,
          color: 'error',
          label: this.$store.getters['i18n/withFallback'](`${ this.stateKey }.error`, null, 'Error')

        },
        unknown: {
          count: 0,
          color: 'warning',
          label: this.$store.getters['i18n/withFallback'](`${ this.stateKey }.unknown`, null, 'Unknown')

        },
      };

      for (const k in this.value) {
        if (k.startsWith('desired')) {
          continue;
        }

        const mapped = STATES[k] || STATES['other'];

        if (out[k]) {
          out[k].count += this.value[k] || 0;
          out[k].color = mapped.color;
        } else {
          out[k] = {
            count: this.value[k] || 0,
            color: mapped.color,
            label: this.$store.getters['i18n/withFallback'](`${ this.stateKey }.${ k }`, null, capitalize(k))
          };
        }
      }

      return out;
    },
  },

  methods: { capitalize },
};
</script>

<template>
  <div class="row flexwrap">
    <div v-for="(v, k) in counts" :key="k" class="col countbox">
      <CountBox
        :compact="true"
        :count="v['count']"
        :name="v.label"
        :primary-color-var="'--sizzle-' + v.color"
      />
    </div>
  </div>
</template>
<style lang="scss" scoped>
  .flexwrap {
    flex-wrap: wrap;
  }
  .countbox {
    min-width: 150px;
    width: 12.5%;
    margin-bottom: 10px;
  }
</style>
