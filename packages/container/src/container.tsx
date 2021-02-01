import { defineComponent, h } from "vue";
import "./style.less";

export default defineComponent((props: {}, { slots }) => {
  return () => <div class="container">{slots.default && slots.default()}</div>;
});
