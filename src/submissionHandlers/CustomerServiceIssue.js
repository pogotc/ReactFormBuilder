
class CustomerServiceIssue {

    tessituraClient;

    constructor(proxyUrl, tessituraClient) {
        this.proxyUrl = proxyUrl;
        this.tessituraClient = tessituraClient;
    }

    getFriendlyName() {
        return "Customer Service Issue";
    }

    handleSubmission(compiledData, params, formData) {
        compiledData['Notes'] = this.formDataToString(formData);
        compiledData['Urgent'] = compiledData['Urgent'].toLowerCase() === "true" ? "true" : "false";
        compiledData['Category'] = parseInt(compiledData['Category'], 10); //can probably remove
        compiledData['PerformanceNumber'] = compiledData['PerformanceNumber'] || 0;
        compiledData['PackageNumber'] = compiledData['PackageNumber'] || 0;
        return this.tessituraClient.sendCustomerServiceIssue(compiledData);
    }

    getEditFields(referenceData, currentValues) {
        let contactMethodChoices = referenceData["CSIContactTypes"] || [];
        contactMethodChoices = contactMethodChoices.map((item) => {
            return {value: item.Id, label: item.Description}
        }).sort((a, b) => {
            return a.label > b.label ? 1 : -1;
        });
        
        let categoryChoices = referenceData["CSICategory"] || [];
        categoryChoices = categoryChoices.map((item) => {
            return {value: item.Id, label: item.Description}
        }).sort((a, b) => {
            return a.label > b.label ? 1 : -1;
        });

        let activityChoices = referenceData["CSIActivityType"] || [];
        let currentCategory = currentValues['Category'];
        if (currentCategory && currentCategory.source === "Hardcode") {
            let currentCategoryValue = currentCategory.value;
            activityChoices = activityChoices.filter((item) => {
                return parseInt(item.Category.Id, 10) === parseInt(currentCategoryValue, 10);
            });
        }
        activityChoices = activityChoices.map((item) => {
            return {value: item.Id, label: item.Description}
        }).sort((a, b) => {
            return a.label > b.label ? 1 : -1;
        });
        
        let originChoices = referenceData["CSIOrigin"] || [];

        // Get the current value of Activity Type
        let currentActivityType = currentValues['ActivityType']; 

        if (currentActivityType && currentActivityType.source === "Hardcode") {
            // Check that it's actually still valid
            let isValid = false;
            activityChoices.forEach((choice) => {
                if (parseInt(choice.value, 10) === parseInt(currentActivityType.value, 10)) {
                    isValid = true;
                }
            });

            let currentActivityTypeValue = isValid ? currentActivityType.value : -1;
            originChoices = originChoices.filter((item) => {
                return item.ActivityType === null || parseInt(item.ActivityType.Id, 10) === parseInt(currentActivityTypeValue, 10);
            });
        }
        originChoices = originChoices.map((item) => {
            return {value: item.Id, label: item.Description}
        }).sort((a, b) => {
            return a.label > b.label ? 1 : -1;
        });

        // Prepend --select-- options
        contactMethodChoices.unshift({value: "", label: "--Select--"});
        categoryChoices.unshift({value: "", label: "--Select--"});
        activityChoices.unshift({value: "", label: "--Select--"});
        originChoices.unshift({value: "0", label: "No Origin"});
        originChoices.unshift({value: "", label: "--Select--"});

        return [
            {name: "ContactMethod", choices: contactMethodChoices},
            {name: "Category", choices: categoryChoices},
            {name: "ActivityType", choices: activityChoices},
            {name: "Origin", choices: originChoices},
            {name: "PerformanceNumber"},
            {name: "PackageNumber"},
            {name: "Urgent"}
        ]
    }

    formDataToString(formData) {
        let dataParts = [];
        for (let fieldName in formData) {
            if (formData.hasOwnProperty(fieldName)) {
                dataParts.push(fieldName + ": " + formData[fieldName]);
            }
        }
        return dataParts.join("\n");
    }
}

export default CustomerServiceIssue;
