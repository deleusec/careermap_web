<script setup lang="ts">
import { useThemeStore } from '@/stores/themeStore';


const themeStore = useThemeStore()



</script>

<template>
  <svg
    v-if="!themeStore.dark"
    viewBox="0 0 888 467"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <line
      opacity="0.2"
      x1="443.5"
      y1="2.18557e-08"
      x2="443.5"
      y2="467"
      stroke="url(#paint0_linear_49_95)"
    />
    <path
      opacity="0.2"
      d="M738.5 0.671055C738.89 171.721 592.11 295.121 592.5 466.171M886.5 0.670969C886.891 171.721 680.11 295.121 680.5 466.171M592.5 0.671228C592.891 171.721 494.61 295.121 495 466.171"
      stroke="url(#paint1_linear_49_95)"
    />
    <path
      opacity="0.2"
      d="M149.062 0.671055C148.671 171.721 295.452 295.121 295.061 466.171M1.06165 0.670969C0.671121 171.721 207.452 295.121 207.061 466.171M295.061 0.671228C294.671 171.721 392.952 295.121 392.562 466.171"
      stroke="url(#paint2_linear_49_95)"
    />
    <defs>
      <linearGradient
        id="paint0_linear_49_95"
        x1="442.5"
        y1="-2.18557e-08"
        x2="442.5"
        y2="467"
        gradientUnits="userSpaceOnUse"
      >
        <stop stop-color="#333333" stop-opacity="0" />
        <stop offset="0.51" />
        <stop offset="1" stop-color="#666666" stop-opacity="0" />
      </linearGradient>
      <linearGradient
        id="paint1_linear_49_95"
        x1="530.5"
        y1="-1.82771"
        x2="531.5"
        y2="436.172"
        gradientUnits="userSpaceOnUse"
      >
        <stop stop-color="#333333" stop-opacity="0" />
        <stop offset="0.51" />
        <stop offset="1" stop-color="#666666" stop-opacity="0" />
      </linearGradient>
      <linearGradient
        id="paint2_linear_49_95"
        x1="357.062"
        y1="-1.82771"
        x2="356.062"
        y2="436.172"
        gradientUnits="userSpaceOnUse"
      >
        <stop stop-color="#333333" stop-opacity="0" />
        <stop offset="0.51" />
        <stop offset="1" stop-color="#666666" stop-opacity="0" />
      </linearGradient>
    </defs>
  </svg>

  <svg
    v-else
    viewBox="0 0 888 467"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <line
      opacity="0.6"
      x1="443.5"
      y1="0"
      x2="443.5"
      y2="467"
      stroke="url(#dark_paint0_linear)"
    />
    <path
      opacity="0.6"
      d="M738.5 0.671055C738.89 171.721 592.11 295.121 592.5 466.171M886.5 0.670969C886.891 171.721 680.11 295.121 680.5 466.171M592.5 0.671228C592.891 171.721 494.61 295.121 495 466.171"
      stroke="url(#dark_paint1_linear)"
    />
    <path
      opacity="0.6"
      d="M149.062 0.671055C148.671 171.721 295.452 295.121 295.061 466.171M1.06165 0.670969C0.671121 171.721 207.452 295.121 207.061 466.171M295.061 0.671228C294.671 171.721 392.952 295.121 392.562 466.171"
      stroke="url(#dark_paint2_linear)"
    />
    <defs>
      <linearGradient
        id="dark_paint0_linear"
        x1="442.5"
        y1="0"
        x2="442.5"
        y2="467"
        gradientUnits="userSpaceOnUse"
      >
        <stop stop-color="#FFFFFF" stop-opacity="0" />
        <stop offset="0.51" stop-color="#BBBBBB" />
        <stop offset="1" stop-color="#DDDDDD" stop-opacity="0" />
      </linearGradient>
      <linearGradient
        id="dark_paint1_linear"
        x1="530.5"
        y1="0"
        x2="531.5"
        y2="436.172"
        gradientUnits="userSpaceOnUse"
      >
        <stop stop-color="#FFFFFF" stop-opacity="0" />
        <stop offset="0.51" stop-color="#BBBBBB" />
        <stop offset="1" stop-color="#DDDDDD" stop-opacity="0" />
      </linearGradient>
      <linearGradient
        id="dark_paint2_linear"
        x1="357.062"
        y1="0"
        x2="356.062"
        y2="436.172"
        gradientUnits="userSpaceOnUse"
      >
        <stop stop-color="#FFFFFF" stop-opacity="0" />
        <stop offset="0.51" stop-color="#BBBBBB" />
        <stop offset="1" stop-color="#DDDDDD" stop-opacity="0" />
      </linearGradient>
    </defs>
  </svg>
</template>

<style scoped></style>
