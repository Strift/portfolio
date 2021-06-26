---
title: Organiser ses raids avec Raid-Helper
date: 2020-05-15
description: Nos conseils pour organiser au mieux vos raids grâce au bot Discord Raid-Helper.
thumbnail: /images/articles/thumbnails/raid-helper.png
thumbnailAlt: 'Screenshot of Raid-Helper'
source: https://raid-helper.com/
highlight: true
tags:
  - video games
---

# Organiser ses raids avec Raid-Helper

<span class="article-date">5 Mai, 2020</span>

> Ce guide a été transféré depuis le blog de la guilde [Astral](https://astral.gg/). ✨

Sur Classic, nombreuses sont les guildes à organiser leurs raids grâce au bot Discord [Raid-Helper](https://raid-helper.com/index). Ce bot permet de créer des évènements auxquels les utilisateurs peuvent s'inscrire, le tout sans quitter le confort de votre serveur Discord. Voici nos conseils !

## Installer Raid-Helper

Les instructions pour installer Raid-Helper sur votre serveur Discord sont documentées sur le site officiel (en anglais). Pour les moins aguerris de la langue de Shakespeare, suivez simplement ces deux étapes.

**1. Invitez le bot sur votre serveur**<br>
Accédez au site de [raid-helper.com](https://raid-helper.com/index) et cliquez sur _Invite the bot to your server_.

**2. Définissez le rôle des gestionnaires**<br>
Pour définir le rôle qui aura la permission de gérer les évènements (ici _Officier_), utilisez la commande `!setManagerRole Officier`.

Et voilà ! On peut passer aux choses sérieuses.

## Créer un évènement

Pour créer un nouvel évènement via Raid-Helper, il vous suffit d'utiliser la commande `!createEvent`. Cette commande aura pour effet d'ouvrir une conversation privée avec le bot. Pour finaliser la création de votre évènement, il ne vous reste qu'à répondre aux questions posées par ce dernier !

Chez Astral, nous préférons ne pas restreindre les inscriptions aux raids guilde et organiser nous mêmes les benchs lorsque nécessaire. En revanche, comme nos raids pick-ups suscitent régulièrement une forte affluence, nous préférons définir la composition du raid au préalable et ainsi restreindre les inscriptions en conséquence.

Pour modifier la composition du raid, il faut déjà avoir créé son évènement. Ensuite, utilisez la commande `!editEvent ID` en remplaçant _ID_ par l'ID du message correspondant à l'évènement. Le bot vous contactera à nouveau en vous proposant une liste d'options correspondant aux propriétés de l'évènement que vous souhaitez modifier. Répondez avec l'option correspondant à _role limits_ et c'est parti !

## Mettre a jour les inscriptions

Raid-Helper permet aussi de mettre à jour manuellement les inscriptions aux évènements. Cette fonctionnalité pourra vous être fortement utile dans deux cas : inscrire un autre utilisateur ou _bencher_ quelqu'un.

Imaginons qu'un membre de votre roster vous ait prévenu de son absence, mais n'a pas eu le temps (ou n'a pas pensé 😠) à mettre à jour son inscription. Grâce à la commande `!addUser ID Absence utilisateur` vous pouvez mettre à jour son inscription à sa place (en remplaçant _ID_ par l'ID du message et _utilisateur_ par le nom approprié).

Comme vous vous en doutez sûrement, cette commande permet en réalité de simuler le fait qu'un joueur s'est lui même inscrit à l'évènement. Il est donc possible de remplacer _Absence_ par tous les types de réactions : celles liées aux classes mais aussi les autres, et donc le bench ! Pour _bencher_ un utilisateur, il suffit donc d'utiliser la commande `!addUser ID Bench utilisateur`.

## Clôturer les inscriptions

Une fois vos benchs réalisés, vous pouvez décider de clôturer les inscriptions à votre évènement en utilisant la commande `!endEvent ID`. Et toc, tant pis pour les retardataires ! L'avantage, c'est que la mise à jour des inscriptions via `!addUser` est toujours possible.

Pas d'inquiétude néanmoins, vous pouvez à tout moment ré-ouvrir les inscriptions grâce à la commande `!openEvent ID`.


J'espère que ce guide vous aura été utile. Pour les usages plus avancés, n'hésitez pas à consulter la [documentation officielle](https://raid-helper.com/commands) (en anglais). À bientôt !
