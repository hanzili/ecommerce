import wixData from 'wix-data';

$w('#summaryProductDetailImage95').link = '//:0'
$w('#pattern95Name').text = ''
$w('#quantity95').text = ''
$w('#unitPrice95').text = ''
var selection_complete = false;
var summary_complete = false;

$w.onReady(function () {

    $w("#selectionNextButton").onMessage((event) => {
        if (event.data === 'Click') {
            // update the progress bar
            selection_complete = true;
            $w("#progressbar").postMessage("selection complete");
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
    });

    $w("#summaryNextButton").onMessage((event) => {
        if (event.data === 'Click') {
            // update the progress bar
            summary_complete = true;
            $w("#progressbar").postMessage("summary complete");
        }
    });

    //handle the quantity selector
    $w("#summaryAdd95").onClick(() => {
        addOne95();
    });
    $w("#summaryMinus95").onClick(() => {
        subtractOne95();
    });
    var quantity95 = 0;
    function addOne95() {
        quantity95++;
        $w("#summaryQuantity95").value = quantity95.toString();
    }
    function subtractOne95() {
        if (quantity95 > 0) {
            quantity95--;
            $w("#summaryQuantity95").value = quantity95.toString();
        }
    }

    var quantity97 = 0;
    $w("#summaryAdd97").onClick(() => {
        addOne97();
    });
    $w("#summaryMinus97").onClick(() => {
        subtractOne97();
    });
    function addOne97() {
        quantity97++;
        $w("#summaryQuantity97").value = quantity97.toString();
    }
    function subtractOne97() {
        if (quantity97 > 0) {
            quantity97--;
            $w("#summaryQuantity97").value = quantity97.toString();
        }
    }
    var quantity98 = 0;
    $w("#summaryAdd98").onClick(() => {
        addOne98();
    });
    $w("#summaryMinus98").onClick(() => {
        subtractOne98();
    });
    function addOne98() {
        quantity98++;
        $w("#summaryQuantity98").value = quantity98.toString();
    }

    function subtractOne98() {
        if (quantity98 > 0) {
            quantity98--;
            $w("#summaryQuantity98").value = quantity98.toString();
        }
    }

    $w('#budgetSlider').disable();
    $w("#budgetSwitch").onClick((event) => {
        if ($w("#budgetSwitch").checked) {
            $w('#budgetSlider').enable();
        } else {
            $w('#budgetSlider').disable();
        }
    })
})

async function quantity_calculate(length) {
    console.log('length: ' + length)
    let wallWidth = await parseInt($w('#wallwidth').value)
    const quantity = Math.round(wallWidth / (length))
    return (quantity)
}

export async function pattern95DropdownElement_change(event) {
  //  flag = 1
    
    let mould = $w('#pattern95DropdownElement').value
    await wixData.query('PanelMoulding_95').eq('title', String(mould)).find()
        .then((results) => {
            $w('#pattern95DetailImage').src = results.items[0].detailsImage
            $w('#pattern95Image').src = results.items[0].image
            $w('#pattern95EnlargementImage').src = results.items[0].enlargementPatternImage
            $w('#pattern95ProductDetailButton').show()

            $w('#summaryProductDetailImage95').src = results.items[0].detailsImage
            $w('#pattern95Name').text = mould
            const leng = results.items[0].length
            const quantity = quantity_calculate(leng)
            $w('#quantity95').text = quantity.toString()
            const unitPrice = results.items[0].price
            $w('#unitPrice95').text = '$' + unitPrice
        })

    if (!$w('#pattern95DetailImage').hidden) {
        $w('#pattern95DetailImage').hide()
        $w('#closeButton1').hide()
    }

    $w('#pattern95Image').show()

    $w('#pattern95EnlargementImage').show()
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
    //flag = 1
    let mould = $w('#pattern97DropdownElement').value
    await wixData.query('PanelMoulding_97').eq('title', String(mould)).find()
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
    let mould = $w('#pattern98DropdownElement').value
    await wixData.query('PanelMoulding_98').eq('title', String(mould)).find()
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

function summaryTitles_show(){
    $w('#productDetailTextTitle').show()
    $w('#quantityTextTitle').show()
    $w('#unitPriceTextTitle').show()
}

export function wallwidth_change(event) {
    let wallWidth = event.target.value
    console.log(wallWidth)
    console.log('$w(\'#wallwidth\').value: ' + $w('#wallwidth').value)
    if (wallWidth >= 250 && wallWidth <= 2500)
        $w('#wallWidthErrorMsg').text = ''
    else {
        $w('#wallWidthErrorMsg').text = 'The wall width(A) has to be in the range of 250cm to 2500cm'
        if ($w('#wallWidthErrorMsg').hidden)
            $w('#wallWidthErrorMsg').show()
    }

    if($w('#pattern95Name').text != null){
        console.log('Inside wallwidth_change(): ' + $w('#pattern95Name').text)
       summaryTitles_show()
       $w('#summaryProductDetailImage95').show()
       $w('#pattern95Name').show()
       $w('#quantity95').show()
       $w('#unitPrice95').show()
    }
}