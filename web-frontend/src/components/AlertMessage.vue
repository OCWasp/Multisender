<template>
  <q-dialog ref="dialog" @hide="onDialogHide" :persistent="type === 'negative'">
    <q-card class="q-dialog-plugin">
      <q-item class="q-pt-md">
        <q-item-section side><q-icon size="md" :color="config.color" :name="config.icon"/></q-item-section>
        <q-item-section class="text-body1 text-bold" :class="['text-'+config.color]">{{message}}</q-item-section>
      </q-item>
      <q-card-actions align="right">
        <q-btn :color="config.color" no-caps label="Confirm" :autofocus="true" flat @click="onOKClick" />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script>
export default {
  props: ['type', 'message'],
  data () {
    return {
      types: {
        positive: { color: 'primary', icon: 'check_circle' },
        negative: { color: 'negative', icon: 'report_problem' },
        info: { color: 'positive', icon: 'info' },
        warning: { color: 'warning', icon: 'error' }
      }
    }
  },
  computed: {
    config () {
      return this.types[this.type] || this.types.info
    }
  },
  methods: {
    // following method is REQUIRED
    // (don't change its name --> "show")
    show () {
      this.$refs.dialog.show()
    },

    // following method is REQUIRED
    // (don't change its name --> "hide")
    hide () {
      this.$refs.dialog.hide()
    },

    onDialogHide () {
      // required to be emitted
      // when QDialog emits "hide" event
      this.$emit('hide')
    },

    onOKClick () {
      // on OK, it is REQUIRED to
      // emit "ok" event (with optional payload)
      // before hiding the QDialog
      this.$emit('ok')
      // or with payload: this.$emit('ok', { ... })

      // then hiding dialog
      this.hide()
    },

    onCancelClick () {
      // we just need to hide dialog
      this.hide()
    }
  }
}
</script>
