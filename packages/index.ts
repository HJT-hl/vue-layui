import { App } from 'vue'
import Anim from './anim'
import Badge from './badge'
import Button from './button'
import ButtonContainer from './button-container'
import ButtonGroup from './button-group'
import Card from './card'
import Carousel from './carousel'
import CarouselItem from './carousel-item'
import Col from './col'
import Collapse from './collapse'
import CollapseItem from './collapse-item'
import Container from './container'
import Dialog from './dialog'
import Edit from './edit'
import Field from './field'
import Flow from './flow'
import Icon from './icon'
import Page from './page'
import Progress from './progress'
import Quote from './quote'
import Rate from './rate'
import Row from './row'
import Slider from './slider'
import Tab from './tab'
import TabPane from './tab-pane'
import Timeline from './timeline'
import TimelineItem from './timeline-item'
import Transfer from './transfer'
import Upload from './upload'

const components = [
  Anim,
  Badge,
  Button,
  ButtonContainer,
  ButtonGroup,
  Card,
  Carousel,
  CarouselItem,
  Col,
  Collapse,
  CollapseItem,
  Container,
  Dialog,
  Edit,
  Field,
  Flow,
  Icon,
  Page,
  Progress,
  Quote,
  Rate,
  Row,
  Slider,
  Tab,
  TabPane,
  Timeline,
  TimelineItem,
  Transfer,
  Upload
]

const install = function (app: App): App {
  components.forEach((component: any) => {
    app.use(component)
  })
  // app.config.globalProperties.$message = message;
  // app.config.globalProperties.$notification = notification;
  // app.config.globalProperties.$info = Modal.info;
  // app.config.globalProperties.$success = Modal.success;
  // app.config.globalProperties.$error = Modal.error;
  // app.config.globalProperties.$warning = Modal.warning;
  // app.config.globalProperties.$confirm = Modal.confirm;
  // app.config.globalProperties.$destroyAll = Modal.destroyAll;
  return app
}

export {
  install,
  Anim,
  Badge,
  Button,
  ButtonContainer,
  ButtonGroup,
  Card,
  Carousel,
  CarouselItem,
  Col,
  Collapse,
  CollapseItem,
  Container,
  Dialog,
  Edit,
  Field,
  Flow,
  Icon,
  Page,
  Progress,
  Quote,
  Rate,
  Row,
  Slider,
  Tab,
  TabPane,
  Timeline,
  TimelineItem,
  Transfer,
  Upload
}

export default {
  install
}
