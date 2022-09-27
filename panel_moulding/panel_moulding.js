import wixData from 'wix-data';

let mould95 = false
let mould97 = false
let mould98 = false
var selection_complete = false;
var quantity95;
var quantity97;
var quantity98;
var selection95;
var selection97;
var selection98;

$w.onReady(function () {
})

function quantity_calculate(length) {
    console.log('length: ' + length)
    let wallWidth = parseInt($w('#wallwidth').value)
    console.log('Inside quantity_calculate, wallWidth value: ' + wallWidth)
    const quantity = Math.round(wallWidth / (length))
    return (quantity)
}

export async function pattern95DropdownElement_change(event) {

    mould95 = true

    let mould = $w('#pattern95DropdownElement').value
    await wixData.query('PanelMoulding_95').eq('title', mould).find()
        .then((results) => {
            $w('#pattern95DetailImage').src = results.items[0].detailsImage
            $w('#pattern95Image').src = results.items[0].image
            $w('#pattern95EnlargementImage').src = results.items[0].enlargementPatternImage
            $w('#pattern95ProductDetailButton').show()
        })

    if (!$w('#pattern95DetailImage').hidden) {
        $w('#pattern95DetailImage').hide()
        $w('#closeButton1').hide()
    }

    $w('#pattern95Image').show()

    $w('#pattern95EnlargementImage').show()

    selection95 = $w("#pattern95DropdownElement").options[$w("#pattern95DropdownElement").selectedIndex].label;
    $w("#summaryType95").text = selection95;
}

export function pattern95ProductDetailButton_click(event) {
    $w('#pattern95DetailImage').show()
    if ($w('#closeButton1').hidden)
        $w('#closeButton1').show()
}

export function closeButton1_click(event) {
    $w('#pattern95DetailImage').hide()
    $w('#closeButton1').hide()
}

export async function pattern97DropdownElement_change(event) {

    mould97 = true

    let mould = $w('#pattern97DropdownElement').value
    await wixData.query('PanelMoulding_97').eq('title', mould).find()
        .then((results) => {
            $w('#pattern97DetailImage').src = results.items[0].detailsImage
            $w('#pattern97Image').src = results.items[0].photo97
            $w('#pattern97EnlargementImage').src = results.items[0].enlargementPatternImage
        })

    $w('#pattern97ProductDetailButton').enable()
    if (!$w('#pattern97DetailImage').hidden) {
        $w('#pattern97DetailImage').hide()
        $w('#closeButton2').hide()
    }

    $w('#pattern97Image').show()

    $w('#pattern97EnlargementImage').show()

    selection97 = $w("#pattern97DropdownElement").options[$w("#pattern97DropdownElement").selectedIndex].label;
    $w("#summaryType97").text = selection97;
}

export function pattern97ProductDetailButton_click(event) {
    $w('#pattern97DetailImage').show()
    if ($w('#closeButton2').hidden)
        $w('#closeButton2').show()
}

export function closeButton2_click(event) {
    $w('#pattern97DetailImage').hide()
    $w('#closeButton2').hide()
}

export async function pattern98DropdownElement_change(event) {

    mould98 = true

    let mould = $w('#pattern98DropdownElement').value
    await wixData.query('PanelMoulding_98').eq('title', mould).find()
        .then((results) => {
            $w('#pattern98DetailImage').src = results.items[0].detailsImage
            $w('#pattern98Image').src = results.items[0].photo
            $w('#pattern98EnlargementImage').src = results.items[0].enlargementPatternImage
        })

    $w('#pattern98ProductDetailButton').enable()
    if (!$w('#pattern98DetailImage').hidden) {
        $w('#pattern98DetailImage').hide()
        $w('#closeButton3').hide()
    }

    $w('#pattern98Image').show()

    $w('#pattern98EnlargementImage').show()

    selection98 = $w("#pattern98DropdownElement").options[$w("#pattern98DropdownElement").selectedIndex].label;
    $w("#summaryType98").text = selection98;
}
export function pattern98ProductDetailButton_click(event) {
    $w('#pattern98DetailImage').show()
    if ($w('#closeButton3').hidden)
        $w('#closeButton3').show()
}

export function closeButton3_click(event) {
    $w('#pattern98DetailImage').hide()
    $w('#closeButton3').hide()
}

function summaryTitles_show() {
    $w('#productDetailTextTitle').show()
    $w('#quantityTextTitle').show()
    $w('#unitPriceTextTitle').show()
}

export async function wallwidth_change(event) {

    $w('#summaryRepeater').onItemReady(($item, $itemData, $index) => {
        console.log('Inside summaryRepeater')
        $item('#detailsImage').src = $itemData.detailsImage
        $item('#patternName').text = $itemData.title
        console.log('#patternName: ' + $item('#patternName').text)
        let quantity = quantity_calculate($itemData.length)
        $item('#quantity').text = quantity.toString()
        $item('#unitPrice').text = ($itemData.price).toString()
    })

    let wallWidth = event.target.value
    console.log(wallWidth)
    console.log('$w(\'#wallwidth\').value: ' + $w('#wallwidth').value)
    if (wallWidth >= 250 && wallWidth <= 2500) {
        $w('#wallWidthErrorMsg').text = ''
        
        if (mould95 === true) {
        let mould = $w('#pattern95DropdownElement').value
        const { items: pattern95Data } = await wixData.query('PanelMoulding_95').eq('title', mould).find()
        $w('#summaryRepeater').data = pattern95Data
    }

    if (mould97 === true) {
        let mould = $w('#pattern97DropdownElement').value
        let { items: pattern97Data } = await wixData.query('PanelMoulding_97').eq('title', mould).find()

        if (mould95 === true) {
            let tempRepeaterData = $w('#summaryRepeater').data
            const oldRepeaterData = { ...tempRepeaterData[0], _id: '95pattern' }
            const newRepeaterData = { ...pattern97Data[0], _id: '97pattern' }
            $w('#summaryRepeater').data = [oldRepeaterData, newRepeaterData]
        } else
            $w('#summaryRepeater').data = pattern97Data
    }

    if (mould98 === true) {
        let mould = $w('#pattern98DropdownElement').value
        let { items: pattern98Data } = await wixData.query('PanelMoulding_98').eq('title', mould).find()

        if (mould95 === true && mould97 === true) {
            let oldRepeaterData = $w('#summaryRepeater').data
            const newRepeaterData = { ...pattern98Data[0], _id: '98pattern' }

            $w('#summaryRepeater').data = [...oldRepeaterData, newRepeaterData]
        } else if (mould95 === true && mould97 === false) {
            let tempRepeaterData = $w('#summaryRepeater').data
            const oldRepeaterData = { ...tempRepeaterData[0], _id: '95pattern' }
            const newRepeaterData = { ...pattern98Data[0], _id: '98pattern' }

            $w('#summaryRepeater').data = [oldRepeaterData, newRepeaterData]
        } else if (mould95 === false && mould97 === true) {
            let tempRepeaterData = $w('#summaryRepeater').data
            const oldRepeaterData = { ...tempRepeaterData[0], _id: '97pattern' }
            const newRepeaterData = { ...pattern98Data[0], _id: '98pattern' }

            $w('#summaryRepeater').data = [oldRepeaterData, newRepeaterData]
        } else {
            $w('#summaryRepeater').data = pattern98Data
        }

    }

    summaryTitles_show()

    $w('#summaryRepeater').show()
    } else {
        $w('#wallWidthErrorMsg').text = 'The wall width(A) has to be in the range of 250cm to 2500cm'
        if ($w('#wallWidthErrorMsg').hidden)
            $w('#wallWidthErrorMsg').show()
    }
}


export function wallWidthEnterButton_click(event) {
	$w("#summaryQuantity95").value = quantity_calculate(240).toString();
    quantity95 = quantity_calculate(240)
    $w("#summaryQuantity97").value = quantity_calculate(240).toString();
    quantity97 = quantity_calculate(240)
    $w("#summaryQuantity98").value = quantity_calculate(240).toString();
    quantity98 = quantity_calculate(240)
}

export function selectionNextButton_message(event) {
	if (event.data === 'Click') {
            // update the progress bar
            selection_complete = true;
            $w("#progressBar").postMessage("selection complete");
            if ($w("#pattern95DropdownElement").enabled) {
                $w("#pattern95DropdownElement").disable();
            } else {
                $w("#pattern95DropdownElement").enable();
            }
            if ($w("#pattern97DropdownElement").enabled) {
                $w("#pattern97DropdownElement").disable();
            } else {
                $w("#pattern97DropdownElement").enable();
            }
            if ($w("#pattern98DropdownElement").enabled) {
                $w("#pattern98DropdownElement").disable();
            } else {
                $w("#pattern98DropdownElement").enable();
            }
            if ($w("#pattern95ProductDetailButton").enabled) {
                $w("#pattern95ProductDetailButton").disable();
            } else {
                $w("#pattern95ProductDetailButton").enable();
            }
            if ($w("#pattern97ProductDetailButton").enabled) {
                $w("#pattern97ProductDetailButton").disable();
            } else {
                $w("#pattern97ProductDetailButton").enable();
            }
            if ($w("#pattern98ProductDetailButton").enabled) {
                $w("#pattern98ProductDetailButton").disable();
            } else {
                $w("#pattern98ProductDetailButton").enable();
            }
    }
}


function addOne95() {
    quantity95++
    $w("#summaryQuantity95").value = quantity95.toString();
}
function minusOne95() {
    if (quantity95 > 0) {
        quantity95--;
    }
    $w("#summaryQuantity95").value = quantity95.toString();
}
export function summaryAdd95_click(event) {
	addOne95();
}
export function summaryMinus95_click(event) {
	minusOne95();
}


function addOne97() {
    quantity97++
    $w("#summaryQuantity97").value = quantity97.toString();
}
function minusOne97() {
    if (quantity97 > 0) {
        quantity97--;
    }
    $w("#summaryQuantity97").value = quantity97.toString();
}
export function summaryAdd97_click(event) {
	addOne97();
}

export function summaryMinus97_click(event) {
	minusOne97();
}


function addOne98() {
    quantity98++
    $w("#summaryQuantity98").value = quantity98.toString();
}
function minusOne98() {
    if (quantity98 > 0) {
        quantity98--;
    }
    $w("#summaryQuantity98").value = quantity98.toString();
}
export function summaryAdd98_click(event) {
	addOne98();
}

export function summaryMinus98_click(event) {
	minusOne98();
}


export function budgetSwitch_click(event) {
	if ($w("#budgetSwitch").checked) {
            $w('#budgetSlider').enable();
        } else {
            $w('#budgetSlider').disable();
        }
}

export function summaryQuantity95_change(event) {
	wixData.query("PanelMoulding_95")
        .eq("title", "95883")
        .find()
        .then((results) => {
            console.log(results.items);
        });
}