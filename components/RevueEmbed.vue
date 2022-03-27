<template>
  <div id="revue-embed">
    <div class="z-10 -mb-3 font-serif text-2xl font-semibold text-center text-indigo-500 ">
      <span class="px-4 py-2 italic bg-indigo-100 border border-indigo-500 rounded shadow-md">Esports Tech News</span>
    </div>
    <form id="revue-form" action="https://www.getrevue.co/profile/esports-tech-news/add_subscriber" method="post" name="revue-form" target="_blank">
      <div class="revue-form-group">
        <label for="member_email">Email address</label>
        <input id="member_email" class="revue-form-field" placeholder="Your email address..." type="email" name="member[email]">
      </div>
      <!-- <div class="revue-form-group">
        <label for="member_first_name">First name <span class="optional">(Optional)</span></label>
        <input id="member_first_name" class="revue-form-field" placeholder="First name..." type="text" name="member[first_name]">
      </div>
      <div class="revue-form-group">
        <label for="member_last_name">Last name <span class="optional">(Optional)</span></label>
        <input id="member_last_name" class="revue-form-field" placeholder="Last name..." type="text" name="member[last_name]">
      </div> -->
      <div class="revue-form-actions">
        <input id="member_submit" type="submit" value="Subscribe" name="member[subscribe]">
      </div>
      <div class="revue-form-footer">
        By subscribing, you agree with Revue’s <a target="_blank" href="https://www.getrevue.co/terms">Terms of Service</a> and <a target="_blank" href="https://www.getrevue.co/privacy">Privacy Policy</a>.
      </div>
    </form>
  </div>
</template>

<style lang="scss" scoped>
#revue-form {
  @apply pt-10 pb-6 px-6 max-w-sm mx-auto shadow-lg border border-indigo-500 rounded-md bg-white;

  .revue-form-group {
    @apply mb-4;

    label {
      @apply text-indigo-400 mb-1 block;

      .optional {
        @apply text-gray-400;
      }
    }

    .revue-form-field {
      @apply bg-indigo-50 px-2 h-10 block w-full text-gray-700 placeholder-gray-400 italic;
    }
  }

  .revue-form-actions {
    @apply my-8;

    input[type="submit"] {
      @apply bg-indigo-500 block hover:shadow-xl h-10 w-40 shadow-lg text-center text-white mx-auto font-semibold;
    }
  }

  .revue-form-footer {
    @apply text-gray-400 text-sm text-center;

    a {
      @apply text-indigo-500;
    }
  }
}
</style>
