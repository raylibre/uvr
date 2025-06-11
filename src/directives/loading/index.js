import {
    insertLoader,
    getSizeModifier,
    getUniqElementId,
    handleLoaderUpdate
} from './loading-service.js';

export const Loading = {
    created(el, binding, node) {
        const id = getUniqElementId(node);
        if (binding.value === true) {
            const sizeClass = getSizeModifier(binding.modifiers);
            insertLoader(el, id, sizeClass);
        } else if (binding.value.value) {
            insertLoader(el, id, null, binding.value.text, binding.value.percentage);
        }
    },
    beforeUpdate(el, binding, node) {
        const id = getUniqElementId(node);
        const sizeClass = getSizeModifier(binding.modifiers);
        handleLoaderUpdate(el, id, binding.value, binding.oldValue, sizeClass);
    }
};
