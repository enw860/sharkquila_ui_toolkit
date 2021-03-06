import Notifications from "./Notifications.vue";
import Button from "../button";
import DisplayText from "../displayText";
import Link from "../link";
import Skeleton from "../skeleton";
import { pluginFactory } from "../../../utils/plugins";

export default pluginFactory({
    components: [
        Notifications
    ],
    plugins: [
        Button,
        DisplayText,
        Link,
        Skeleton
    ]
})