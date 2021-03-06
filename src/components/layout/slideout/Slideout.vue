<template>
	<div
		class="Slideout"
		v-bind:class="isVisible ? 'show' : 'hide'"
		@click="checkContentBeforeClose"
	>
		<div class="SlideoutContent" v-bind:class="directionClass">
			<slot name="content"></slot>
		</div>
	</div>
</template>

<script>
import { normalizeInput } from "../../../utils/utilities";

const DIRECTION = {
	left: "slide-left",
	right: "slide-right",
};

export default {
	controlName: "l-slideout",
	name: "Slideout",
	data: function () {
		return {
			isVisible: false,
		};
	},
	props: {
		direction: {
			type: String,
			default: "left",
			description: "Direction of the slideout.",
			options: Object.keys(DIRECTION),
		},
	},
	computed: {
		directionClass: function () {
			return normalizeInput(DIRECTION, this.direction);
		},
	},
	methods: {
		checkContentBeforeClose: function (event) {
			if (this.isVisible) {
				!this.contentCheck(event) && this.hideSlideout(event);
			}
		},
		contentCheck: function (event) {
			const parent = this.$el.querySelector(".SlideoutContent");
			const target = event.target;
			return parent && target && parent.contains(target);
		},
		showSlideout: function (event) {
			this.isVisible = true;
			document.body.classList.add("ScrollLock");
			!!this._events.show && this.$emit("show", event);
		},
		hideSlideout: function (event) {
			this.isVisible = false;
			document.body.classList.remove("ScrollLock");
			!!this._events.hide && this.$emit("hide", event);
		},
	},

	expose_events: {
		"@hide": {
			description: "Binded action, triggered on slideout being hided.",
		},
		"@show": {
			description: "Binded action, triggered on slideout being shown.",
		},
	},

	expose_methods: {
		showSlideout: {
			description: "Programmatically show the slideout.",
		},
		hideSlideout: {
			description: "Programmatically hide the slideout.",
		},
	},

	expose_slots: {
		content: {
			description: "Body part of the slideout control.",
		},
	},
};
</script>