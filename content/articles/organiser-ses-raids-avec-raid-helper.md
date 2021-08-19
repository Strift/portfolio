---
title: Organiser ses raids avec Raid-Helper
date: 2020-05-15
description: Notre guide pour organiser au mieux vos raids WoW Classic grâce au bot Discord Raid-Helper.
thumbnail: /images/articles/thumbnails/raid-helper.png
thumbnailAlt: 'Screenshot of Raid-Helper'
source: https://raid-helper.com/
highlight: true
tags:
  - video games
---

# Organiser ses raids avec Raid-Helper

<span class="article-date">Mis à jour le 19 Août, 2021</span>

Ce tutoriel a pour but de vous apprendre comment organiser au mieux vos raids sur WoW Classic grâce au bot Discord [Raid-Helper](https://raid-helper.com/index). Raid-Helper permet de créer des évènements auxquels les joueurs peuvent s'inscrire — le tout sans quitter le confort de votre serveur Discord. C'est parti !

## Installer et configurer Raid-Helper

Première étape : installer le bot sur votre serveur Discord. Pour cela, suivez simplement ces deux étapes.

**1. Invitez le bot sur votre serveur**<br>
Sur le site de [raid-helper.com](https://raid-helper.com/), cliquez sur _Add to Discord_. Choisissez ensuite le serveur sur lequel vous souhaitez inviter le bot (là où vous souhaitez créer des évènements !)

**2. Définissez le rôle des gestionnaires**<br>
Pour donner au rôle _Officier_ la permission pour créer des évènements, utilisez la commande `!setManagerRole Officier` dans le serveur précédemment choisi.

Et voilà ! On peut passer aux choses sérieuses.

## Créer un évènement

Pour créer un évènement avec Raid-Helper, il vous suffit d'utiliser la commande `!createEvent`. Lorsque vous utilisez cette commande, le bot va vous contacter en message privé. C'est en répondant au bot que vous pourrez finaliser la création de votre évènement.

> Une fois l'évènement créé, Raid-Helper associe un _ID_ à chaque évènement. Celui-ci est disponible sur le message qui représente l'évènement.

Chez Astral, nous préférons ne pas restreindre les inscriptions aux raids en guilde et laissons aux _Class Leaders_ le soin d'organiser les benchs lorsque nécessaire. En revanche, comme nos raids _pick-ups_ suscitent une forte affluence, nous préférons définir la composition du raid au préalable et restreindre les inscriptions en conséquence.

Pour modifier la composition du raid, il faut déjà avoir créé son évènement. Utilisez ensuite la commande `!editEvent ID`, en remplaçant _ID_ par l'ID de l'évènement. Le bot vous contactera à nouveau en vous proposant de modifier différentes propriétés de l'évènement. Répondez avec l'option correspondant à _role limits_ et pour modifier la composition du raid !

## Mettre a jour les inscriptions

Il est aussi possible de mettre à jour les inscriptions manuellement. Cette fonctionnalité peut notamment être utile pour inscrire un autre joueur ou _bencher_ quelqu'un.

Imaginons qu'un membre de votre roster vous ait prévenu de son absence, mais n'ait pas mis à jour son inscription (😠). Grâce à la commande `!addUser ID Absence utilisateur`, vous pouvez mettre à jour son inscription à sa place (en remplaçant _ID_ par l'ID de l'évènement et _utilisateur_ par le nom approprié).

Cette commande permet en réalité de simuler l'inscription d'un autre utilisateur Discord. Il est donc possible de remplacer _Absence_ par tous les types de réactions : celles liées aux classes mais aussi les autres, et donc le bench ! Pour _bencher_ un utilisateur, il suffit donc d'utiliser la commande `!addUser ID Bench utilisateur`.

## Clôturer les inscriptions

Une fois vos benchs réalisés, vous pouvez décider de clôturer les inscriptions à votre évènement en utilisant la commande `!endEvent ID`. Et toc, tant pis pour les retardataires ! L'avantage, c'est que vous pouvez toujours mettre à jour les inscriptions manuellement via la commande `!addUser`.

Pas d'inquiétude néanmoins, vous pouvez à tout moment ré-ouvrir les inscriptions grâce à la commande `!openEvent ID`.


J'espère que ce guide vous aura été utile. Pour les usages plus avancés, n'hésitez pas à consulter la [documentation officielle](https://raid-helper.com/commands) (en anglais). À bientôt !

> Article initialement publié sur le blog de la guilde [Astral](https://classic.warcraftlogs.com/guild/eu/sulfuron/astral). ✨
