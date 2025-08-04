<script lang="ts" setup>
import { ICONS, SOCIAL_LINKS } from '~/constants'

const route = useRoute()
const isHomePage = computed(() => route.path === '/')
const isContactPage = computed(() => route.path === '/contact')
</script>

<template>
  <div class="font-sans">
    <header class="fixed top-0 left-0 right-0 z-10 bg-white dark:bg-neutral-950 h-[var(--header-height)] flex items-center">
      <div class="max-w-screen-md lg:max-w-screen-lg w-full px-4 py-6 sm:py-8 mx-auto flex justify-between items-center">
        <div class="text-2xl lg:text-3xl xl:text-4xl font-extrabold font-title">
          <NuxtLink
            class="flex items-center text-color-title no-underline"
            to="/"
          >
            <NuxtImg
              src="/images/me.jpg"
              alt="Picture of Laurent Cazanove"
              height="40"
              width="40"
              class="rounded-full lg:hidden mr-4"
            />
            <NuxtImg
              src="/images/me.jpg"
              alt="Picture of Laurent Cazanove"
              height="48"
              width="48"
              class="rounded-full hidden lg:block xl:hidden mr-6"
            />
            <NuxtImg
              src="/images/me.jpg"
              alt="Picture of Laurent Cazanove"
              height="64"
              width="64"
              class="rounded-full hidden xl:block mr-8"
            />
            <component :is="isHomePage ? 'h1' : 'span'">
              Laurent<span class="hidden md:inline"> Cazanove</span>
            </component>
          </NuxtLink>
        </div>
        <NuxtLink
          to="/contact"
          class="inline-flex items-center link-button lg:text-lg xl:text-xl"
        >
          <Icon
            :name="ICONS.CONTACT"
            class="text-xl lg:text-2xl mr-2 lg:mr-3"
          />
          Contact
        </NuxtLink>
        <!-- <SocialLinks class="md:flex hidden" /> -->
      </div>
    </header>
    <main class="max-w-screen-md lg:max-w-screen-lg mx-auto px-4 mt-[var(--header-height)]">
      <slot />
    </main>
    <footer>
      <div class="mt-8 sm:mt-12 mb-20 lg:mb-24 xl:mb-28">
        <div class="max-w-screen-md lg:max-w-screen-lg px-4 mx-auto mb-10 lg:mb-12 xl:mb-14">
          <h2 class="mb-4 lg:mb-6 xl:mb-8 heading-2">
            💌 Join my newsletter
          </h2>
          <p class="text-color lg:text-lg xl:text-xl mb-6 lg:mb-8 xl:mb-10">
            Subscribe to my newsletter to get my latest articles and updates.
          </p>
          <div class="border shadow-lg dark:border-neutral-800 dark:shadow-neutral-800  border-neutral-200 rounded-md mb-10">
            <BlogKitForm
              form="keep-in-touch"
            />
          </div>
          <h2 class="mb-4 lg:mb-6 xl:mb-8 heading-2">
            🤙 Get in touch
          </h2>
          <p class="text-color lg:text-lg xl:text-xl mb-2 lg:mb-4 xl:mb-6">
            Find me on
            <span
              v-for="(social, index) in SOCIAL_LINKS"
              :key="social.name"
            >
              <NuxtLink
                :to="social.href"
                target="_blank"
                class="link"
              >
                {{ social.name }}
              </NuxtLink>
              <span v-if="index < SOCIAL_LINKS.length - 2">, </span>
              <span v-if="index === SOCIAL_LINKS.length - 2">, and </span>
            </span>.
          </p>
          <p
            v-if="!isContactPage"
            class="text-color lg:text-lg xl:text-xl"
          >
            For business inquiries, visit the <NuxtLink
              to="/contact"
              class="link"
            >contact page</NuxtLink>.
          </p>
          <p
            v-else
            class="text-color lg:text-lg xl:text-xl"
          >
            For business inquiries, please book a meeting or send an email.
          </p>
        </div>
      </div>
      <div class="px-4 py-4 z-10 fixed bottom-0 left-0 right-0 bg-white dark:bg-neutral-950">
        <SocialLinks />
      </div>
    </footer>
  </div>
</template>
