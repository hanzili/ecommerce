import wixData from 'wix-data';
import { local } from 'wix-storage';
var selection_complete = false;
$w.onReady(function () {

    $w('#button11').onClick((event) => {

        if (!$w('#input14').validity.rangeOverflow && !$w('#input14').validity.rangeUnderflow)
            $w('#wallWidthErrorMsg').text = ''
        else {
            $w('#wallWidthErrorMsg').text = 'The wall width(A) has to be in the range of 250cm to 2500cm'
            if ($w('#wallWidthErrorMsg').hidden)
                $w('#wallWidthErrorMsg').show()
        }

        $w('#pattern98').onChange((event) => {
            pattern_display1()

        })
    })

    // handle the progress bar
    $w("#html2").onMessage((event) => {
        if (event.data === 'Click') {
            selection_complete = true;
            $w("#html1").postMessage("selection complete");
            if ($w("#input14").enabled) {
                $w("#input14").disable();
            } else {
                $w("#input14").enable();
            }
            if ($w("#button11").enabled) {
                $w("#button11").disable();
            } else {
                $w("#button11").enable();
            }
            if ($w("#pattern95").enabled) {
                $w("#pattern95").disable();
            } else {
                $w("#pattern95").enable();
            }
            if ($w("#pattern97").enabled) {
                $w("#pattern97").disable();
            } else {
                $w("#pattern97").enable();
            }
            if ($w("#pattern98").enabled) {
                $w("#pattern98").disable();
            } else {
                $w("#pattern98").enable();
            }
        }
    });

    //handle the quantity selector
    $w("#quantityAdd95").onClick(() => {
        addOne();
    });
    $w("#quantityMinus95").onClick(() => {
        subtractOne();
    });
    var quantity95 = 0;

    function addOne() {
        quantity95++
        $w("#quantity95").value = quantity95.toString();
    }

    function subtractOne() {
        if (quantity95 > 0) {
            quantity95--;
            $w("#quantity95").value = quantity95.toString();
        }
    }

    $w("#budgetSwitch").onClick((event) => {
        if ($w("#budgetSwitch").checked) {
            $w('#budgetSlider').enable();
        } else {
            $w('#budgetSlider').disable();
        }
    })

    // product information
    wixData.query("PanelMoulding_95")
    .gt("Title", "95883")
    .find()
    .then( (results) => {
        console.log(results.items);
    } );
})

async function pattern_display1() {

    //console.log('The repeater data height: ' + ($w('#pattern98repeatr').data.length))

    $w('#pattern98repeatr').onItemReady(($item, $itemData, $index) => {
        //  console.log('itemData._id: ' + $itemData._id) 
        $item('#pattern98img').src = $itemData.photo
        //     $item('#pattern98img').fitMode = 'fixedWidth'
    })

    const { items: dataSet_row } = await wixData.query('PanelMoulding_98')
        .contains('title', String($w('#pattern98').value))
        .find()

    $w('#pattern98repeatr').data = dataSet_row

    if ($w('#pattern98repeatr').hidden) {
        console.log('Inside repeatr hidden condition true')
        $w('#pattern98repeatr').show()
    }
    const leng = dataSet_row[0].mouldLength
    const no_of_items = no_of_items_calculate(leng)
    let addedRepeater = $w('#pattern98repeatr').data

    let i = 0
    while (i < no_of_items - 1) {
        const newRepeaterItem = { ...addedRepeater[0], _id: 'new-id' + i }
        addedRepeater.push(newRepeaterItem)
        $w('#pattern98repeatr').data = addedRepeater
        i++
    }
}

function no_of_items_calculate(length) {
    let wallWidth = parseFloat($w('#input14').value)
    const no_of_items = Math.round(wallWidth / length)
    return (no_of_items)
}