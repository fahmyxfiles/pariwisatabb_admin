<template>
    <div>
        <b-card class="mb-4">
          <b-card-text>
            This is some text within a card body. Jelly lemon drops tiramisu chocolate cake cotton candy soufflé oat cake sweet roll. Sugar plum marzipan dragée topping cheesecake chocolate bar. Danish muffin icing donut.
          </b-card-text>
        </b-card>
    </div>
</template>
<script>
    import {
    BCard, BCardText
    } from 'bootstrap-vue'
    export default{
        components:{
            BCard, 
            BCardText
        },
        data(){
            return{
                query: {
                    keyword : '',
                    limit: 6,
                    page: 1,
                }
            }
        },
        computed:{
            
        }
    }
</script>