<template>
    <div class="row justify-content-center">
        <div class="col-md-6">
            <!-- Update Student content -->
            <h3 class="text-center">Update Student</h3>
            <form @submit.prevent="handleUpdateForm">
                <div class="form-group">
                    <label>Service Name</label>
                    <input type="text" class="form-control" v-model="service.firstName" required>
                </div>

                <div class="form-group">
                    <label>Service Description</label>
                    <input type="text" class="form-control" v-model="service.description" required>
                </div>

                <div class="form-group">
                    <label>Service Status</label>
                    <input type="checkbox" class="form-control" v-model="service.status" required>
                </div>
                <button class="btn btn-danger mt-3">Update</button>

            </form>
        </div>
    </div>
</template>

<script>
import axios from "axios";

export default {
     data() {
        return {
            service: { }
        }
    },
    created() {
        let apiURL = `http://localhost:3001/service/${this.$route.params.id}`;

        axios.get(apiURL).then((res) => {
            this.service = res.data;
        })
    },
    methods: {
        handleUpdateForm() {
            let apiURL = `http://localhost:3001/service/${this.$route.params.id}`;

            axios.put(apiURL, this.service).then((res) => {
                console.log(res)
                this.$router.push('/view')
            }).catch(error => {
                console.log(error)
            });
        }
    }
    }
</script>