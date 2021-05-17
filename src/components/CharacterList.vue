<template>
  <b-row>
    <TagFilter class="col-2" :tags="characterTags" :selected="selected"/>
    <b-col cols="8">
      <b-col cols="4" class="ml-auto p-0">
        <b-input-group>
          <b-form-input v-model="charName"></b-form-input>
          <b-input-group-append>
            <b-input-group-text>
              <b-icon icon="search"/>
            </b-input-group-text>
          </b-input-group-append>
        </b-input-group>
      </b-col>
      <b-list-group>
        <b-list-group-item v-for="ninja in filterCharacters(charName,selected)" :key="ninja.id">
          <div class="row p-1">
            <b>{{ ninja.name }}</b>
            <div class="ml-auto">{{ ninja.type }}</div>
          </div>
          <b-row class="p-1">
            <b-img v-bind="imgProps" :src="ninja.image"></b-img>
            <div class="col p-0 ml-2">
              <b-card no-body>
                <b-card-header class="p-0">
                  <b-button class="w-50" v-b-toggle="'talent-'+ninja.id" variant="outline">Талант</b-button>
                  <b-button class="w-50" v-b-toggle="'skill-'+ninja.id" variant="outline">Навык</b-button>
                </b-card-header>
              </b-card>
              <b-collapse :id="'talent-'+ninja.id">
                <b-card>
                  <b>Талант:</b>
                  {{ ninja.talent }}
                </b-card>
              </b-collapse>
              <b-collapse :id="'skill-'+ninja.id">
                <b-card>
                  <b>Навык:</b>
                  {{ ninja.skill }}
                </b-card>
              </b-collapse>
            </div>
          </b-row>
        </b-list-group-item>
      </b-list-group>
    </b-col>
  </b-row>
</template>

<script>
import TagFilter from "@/components/TagFilter";
import {ninjasRef} from "@/main";

export default {
  name: "CharacterList",
  components: {TagFilter},
  data() {
    return {
      // ninjaList: [
      //   {
      //     id: 1,
      //     name: 'Temari',
      //     talent: 'Врождённо имеет 82% скорости, 60% рейтинга атаки и 50% рейтинга защиты.Находясь в формации, понижает скорость врагов на 50% и рейтинг защиты на 28%, увеличивает атаку союзников на 25%, рейтинг атаки на 30% и рейтинг точности на 80%. Игнорирует 20% вражеской атаки, и 150% отражения. Иммунитет к ветряному заключению и метке смерти.',
      //     skill: 'Атакует всех врагов сила атаки 330%, 80% шанс наложить на врага Ветряное заключение на 2 раунда(Нельзя атаковать, невозможно снять), накладывает статус Сожжения 90% от атаки(ДОТ, невозможно снять). Увеличивает атаку союзных штурмовиков и поддержки на 25%, и рейтинг пробития на 30%. Увеличивает защиту авангарда на 500%, уменьшает отхил врага на 90%. Восстанавливает себе 68 ярости и 30 ярости союзникам.',
      //     image: 'https://sun1.beltelecom-by-minsk.userapi.com/c858520/v858520219/c71ca/OOQEsedvAN8.jpg',
      //     type: 'Поддержка',
      //     tags: {
      //       talent: ['reduceAIR', 'increaseATK', 'increaseAR', 'increaseHIT', 'ignoreATK', 'ignoreReflect'],
      //       skill: ['dot', 'increaseATK', 'increasePunch', 'increaseDEF', 'reduceHeal'],
      //       immunity: ['windBound', 'deathSeed'],
      //       control: ['windBound']
      //     }
      //   },
      //   {
      //     id: 2,
      //     name: 'Ino',
      //     talent: 'Увеличивает чакру и ловкость на определенный процент, врожденно имеет 84% скорости, 60% рейтинга урона, 55% рейтинга защиты. Находясь в бою, увеличивает скорость союзников на 102% и хп на 25%. Снижает противнику рейтинг урона на 20%. Когда её атакуют имеет 35% шанс очистить от дебаффов себя и 50% шанс очистить от дебаффов союзников, а также наложить на противника контроль на 2 раунда (80% шанс наложить ослепление или заключение и 100% шанс наложить проклятие или хаос). Иммунитет к ослеплению и хаосу.',
      //     skill: 'Атакует 3 врагов, сначала 100% атакует врага с наименьшим здоровьем и 2 рандомных, сила атаки 400%. Восстанавливает здоровье союзников на 150% от атаки, 55% шанс наложить на каждого союзника Супер S Уворот на 2 раунда(шанс действует по отдельности на каждого персонажа кроме себя), вражеские сапорты и штурмовики противника получат запрет на получения баффов и снизит им атаку и защиту на 30% на 2 раунда. Восстанавливает себе 68 ярости и 30 ярости союзникам.',
      //     image: 'https://sun2.beltelecom-by-minsk.userapi.com/c854220/v854220682/c3533/8EUhrmtAoDw.jpg',
      //     type: 'Поддержка',
      //     tags: {
      //       talent: ['increaseHP', 'increaseAR', 'increaseHIT', 'ignoreATK', 'ignoreReflect'],
      //       skill: ['increaseATK', 'increasePunch', 'increaseDEF', 'reduceHeal'],
      //       immunity: ['windBound', 'deathSeed'],
      //       control: ['windBound']
      //     }
      //   }
      // ],
      ninjaList: [],
      charName: '',
      imgProps: {
        width: 56,
        height: 56
      },
      characterTags: {
        talent: ['increaseHP', 'reduceAIR', 'increaseATK', 'increaseAR', 'increaseHIT', 'ignoreATK', 'ignoreReflect'],
        skill: ['dot', 'increaseATK', 'increasePunch', 'increaseDEF', 'reduceHeal'],
        immunity: ['windBound', 'deathSeed'],
        control: ['windBound']
      },
      selected: {}
    }
  },
  methods: {
    filterCharacters: function (charName, selected) {
      let tmpList = this.ninjaList;
      if (charName.length !== 0) {
        tmpList = tmpList.filter(function (character) {
              return character.name.toLowerCase().indexOf(charName.toLowerCase()) !== -1
            }
        )
      }
      if (!this.isFilterEmpty(selected)) {
        tmpList = tmpList.filter(function (character) {
          for (const [key, value] of Object.entries(selected)) {
            for (const tag of value) {
              if (character.tags[key].indexOf(tag) < 0)
                return false;
            }
          }
          return true;
        })
      }
      return tmpList
    },
    isFilterEmpty: function (selected) {
      for (const [, value] of Object.entries(selected)) {
        if (value != null && value.length !== 0)
          return false;
      }
      return true;
    },
    onDataChange: function (snapshot) {
      if (snapshot.exists()) {
        this.ninjaList = snapshot.val();
      } else {
        console.log("No data available");
      }
    }
  },
  mounted() {
    ninjasRef.on("value", this.onDataChange);
  }
}
</script>

<style scoped>
</style>
