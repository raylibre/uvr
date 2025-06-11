const loaderSelector = 'sg-block-loader';
const SPIN = `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none">
    <circle cx="12" cy="12" r="10" stroke="#e5e7eb" stroke-width="2"/>
    <path d="M12 2a10 10 0 0 1 10 10" stroke="#FF6B2C" stroke-width="2" stroke-linecap="round"/>
</svg>`;

function getLoaderElement(id, sizeClass, displayText, percentage, style = '') {
    const wrapper = document.createElement('div');

    const text = displayText || '';
    const percentageBlock = text ? `<span class="loader-percentage">${percentage ? ' ' + percentage + '%' : '...'}</span>` : '';

    wrapper.innerHTML = `<div
            class="${loaderSelector} ${sizeClass}"
            loader-id="${id}"
            style="${style}"  
            at-loader 
         >
            <div class="sg-loader-spin">${SPIN}</div>
            <span class="sg-loader-text">${text}${percentageBlock}</span>
        </div>`;
    return wrapper.firstChild;
}

function findLoader(el, id) {
    return el.querySelectorAll(`[loader-id="${id}"]`);
}

function updatePercentage(el, id, percentage) {
    const loader = el.querySelector(`[loader-id="${id}"] .loader-percentage`);
    if (loader) {
        loader.textContent = ` ${percentage}%`;
    }
}

function getBorderRadiusString(el) {
    const elBorderRadius = getComputedStyle(el).getPropertyValue('border-radius');
    return `border-radius: ${elBorderRadius};`;
}

/**
 * sizeClass can be 'size-medium' or 'size-medium' or null
 */
function insertLoader(el, id, sizeClass, text, percentage) {
    const style = getBorderRadiusString(el);
    const loader = getLoaderElement(id, sizeClass, text, percentage, style);

    el.append(loader);
}

function removeLoader(el, id) {
    const loaders = findLoader(el, id);
    loaders.forEach(loader => {
        loader.remove();
    });
}

function handleLoaderUpdate(el, id, value, oldValue, sizeClass) {
    const loaderElement = findLoader(el, id);
    if (loaderElement.length === 0) {
        if (value === true) {
            insertLoader(el, id, sizeClass);
        } else if (value.value && oldValue.value !== value.value) {
            insertLoader(el, id, null, value.text, value.percentage);
        }
    } else if (value.value === false || value === false) {
        removeLoader(el, id);
    } else if (value.percentage !== oldValue.percentage) {
        updatePercentage(el, id, value.percentage);
    }
}

function getSizeModifier(modifiers) {
    return modifiers.medium
        ? 'size-medium'
        : modifiers.small
            ? 'size-small'
            : null;
}

function getUniqElementId(node) {
    return node?.ctx?.uid || 0;
}

function removeGlobalSpaLoader() {
    const spaLoader = document.getElementById('spa-loader');
    if (spaLoader) spaLoader.remove();
}

export {
    SPIN,
    insertLoader,
    removeLoader,
    getSizeModifier,
    getUniqElementId,
    handleLoaderUpdate,
    removeGlobalSpaLoader
};
