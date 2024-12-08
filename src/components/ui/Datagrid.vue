<script setup>
import { ref, computed, defineProps, onMounted, reactive, nextTick, watch } from 'vue';
// import RangeDateFilter from '@/components/core/RangeDateFilter.vue'


const emits = defineEmits(['rowclick'])

const props = defineProps(['data','columns'])

const searchQuery = ref('');
const currentPage = ref(1);
const itemsPerPage = ref(props.itemsPerPage ?? 10);
const totalItems = ref(0);
const data = ref([]);
const sortKey = ref('');
const sortDir = ref('asc');
const isLoading = ref(false);
const filters = reactive({})

watch(() => props.data,()=> {
    data.value = props.data
})

onMounted(async() => {
  props.columns.forEach((col) => {
      filters[col.key] = ''
  })
})


const totalPages = computed(() => {
  return Math.ceil(totalItems.value / itemsPerPage.value);
});



const nextPage = async () => {
  if (currentPage.value < totalPages.value) {
    currentPage.value++;
  }
};

const prevPage = async () => {
  if (currentPage.value > 1) {
    currentPage.value--;
  }
};



// Filter the data based on the filters object
const filteredData = computed(() => {
  let result = props.data;

  // Apply filters
  for (const key in filters) {
    const filterValue = filters[key];
    if (typeof filterValue === 'string' && filterValue) {
      result = result.filter((row) =>
        String(row[key]).toLowerCase().includes(filterValue.toLowerCase())
      );
    } else if (filterValue.start && filterValue.end) {
      result = result.filter((row) => {
        const dateValue = new Date(row[key]);
        const startDate = new Date(filterValue.start);
        const endDate = new Date(filterValue.end);
        return dateValue >= startDate && dateValue <= endDate;
      });
    }
  }

  // Apply sorting
  if (sortKey.value) {
    result.sort((a, b) => {
      const aValue = a[sortKey.value];
      const bValue = b[sortKey.value];

      if (aValue === bValue) return 0;
      return sortDir.value === 'asc' ? (aValue < bValue ? -1 : 1) : (aValue > bValue ? -1 : 1);
    });
  }

  return result;
});

const handleSortClick = (key) => {
  
  if (sortKey.value === key) {
    sortDir.value = sortDir.value === 'asc' ? 'desc' : 'asc';
  } else {
    sortKey.value = key;
    sortDir.value = 'asc';
  }

  
  sortData();
};

const sortData = () => {
  data.value.sort((a,b) => {
    const aValue = a[sortKey.value];
    const bValue = b[sortKey.value];

    if (aValue === bValue) return 0;

    
    if (sortDir.value === 'asc') {
      return aValue < bValue ? -1 : 1;
    } else {
      return aValue > bValue ? -1 : 1;
    }
  });
};

const sortDirArrow = computed(() => {
  if (sortKey.value && sortKey.value !== '') {
    return sortDir.value === 'asc' ? '↑' : '↓';
  }
  return '';
});

</script>

<template>
  <div class="container">
    <div class="!w-full border-[1px] rounded-md overflow-x-auto flex">
      <table class="w-full text-base" v-if="filters">
        <thead class="border-b-[1px]">
          <tr class="border-b">
            <template v-for="column in props.columns" :key="column.key">
              <th @click="handleSortClick(column.key)" :style="column.class"
                :class="[{ 'bg-gray-100': sortKey === column.key }, column.class]"
                class="uppercase hover:bg-gray-300 cursor-pointer p-4 py-2 border-r-[1px]">
                <span
                >{{ column.title }}
                  <i> {{ sortKey === column.key ? sortDirArrow : '' }}</i>
            </span>
              </th>
            </template>
          </tr>
          <tr>
            <template v-for="column in props.columns" :key="column.key">
              <th v-if="column.searchType" class="border-r mx-2" >
                <div class="flex border rounded-md items-center max-w-56 min-w-full" :class="[column.class]" >
                  <i class="lni lni-search-1 px-1 cursor-pointer" 
                  :class="{ 'lni-xmark text-[10px] font-semibold' : filters[column.key] !== '' }"
                  title="Reset" @click="filters[column.key] = ''" ></i>
                  <input @input="debouncedSearch" :type="column.searchType" v-model="filters[column.key]" class="outline-none px-2 p-1 w-full rounded-md h-full font-normal bg-inherit">
                </div>
              </th>
              <th v-else class="border-r" ></th>
            </template> 
          </tr>
        </thead>
         <tbody v-if="isLoading" >
          <tr>
            <td :colspan="props.columns.length" class="text-center p-4">
               <div class="flex justify-center items-center" >
                 <svg  class="animate-spin h-10 w-10 mr-3 border-slate-200 border-t-blue-500 border-4 rounded-full">
                </svg>
              Loading...
               </div>
            </td>
          </tr>
        </tbody>
        <tbody v-else-if="!isLoading && filteredData.length > 0">
          <tr @click="emits('rowclick',cell)" v-for="cell in filteredData" :key="cell.id" class="hover:bg-gray-200 border-b-[1px] cursor-pointer">
            <template v-for="column in props.columns" :key="column.key">
              <td v-if="column.slot" :class="[column.class]" class="p-2 pl-4">
                <slot :name="column.slot" :data="cell"></slot>
              </td>
              <td v-else :class="[column.class]" class="p-2 pl-4">{{ cell[column.key] }}</td>
            </template>
          </tr>
        </tbody>
         <tbody v-else>
          <tr>
            <td :colspan="props.columns.length" class="text-center p-4">
               No Data Found
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <h1 class="text-base sm:hidden" >
          Showing {{ (currentPage - 1) * itemsPerPage + 1  }} - {{ currentPage  }} of {{ currentPage }}
        </h1>
    <div class="mt-4 flex justify-between items-center">
        <!-- <div class="flex gap-2">
          <template v-for="perpage in [10,20,30,40]">
            <button type="button" class="text-sm p-2 rounded bg-green-500/20 text-green-500 font-semibold"
            @click="itemsPerPage = perpage"
            :class="{
              '!bg-green-500 !text-white' :itemsPerPage === perpage
            }"
            >{{ perpage }}</button>
          </template>
        </div> -->
      <h1 class="text-base sm:text-lg hidden sm:flex" >
          Showing {{ (currentPage - 1) * itemsPerPage + 1  }} - {{ currentPage   }} of {{ currentPage }}
        </h1>
      <div class="gap-1 flex" >
      <button type="button" @click="prevPage" :disabled="currentPage === 1 || isLoading" class="p-2 border border-transparent hover:bg-slate-400/20 flex items-center justify-center rounded mr-2 disabled:cursor-not-allowed">
        <i class="lni lni-chevron-left"></i>
      </button>
      <div class="flex items-center justify-center bg-blue-600/10 p-4 py-2 rounded text-blue-600 font-semibold" >{{ currentPage }}</div>
      <button type="button" @click="nextPage" :disabled="currentPage === totalPages || isLoading" class="p-2 border border-transparent hover:bg-slate-400/20 flex items-center justify-center rounded disabled:cursor-not-allowed">
        <i class="lni lni-chevron-right"></i>
      </button>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* Custom styles can be added here if needed */
</style>
