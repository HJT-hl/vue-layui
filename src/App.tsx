import { defineComponent, h } from "vue";
import Container from "../packages/container/index";
import Row from "../packages/row/index";
export default defineComponent({
  setup() {
   
    return () => <Container>
      <Row>
        hello
      </Row>
    </Container>;
  },
});
