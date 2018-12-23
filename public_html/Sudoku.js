/* 
 * Copyright (C) 2018 Logan Reich
 *
 * This program is free software; you can redistribute it and/or
 * modify it under the terms of the GNU General Public License
 * as published by the Free Software Foundation; either version 2
 * of the License, or (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program; if not, write to the Free Software
 * Foundation, Inc., 59 Temple Place - Suite 330, Boston, MA  02111-1307, USA.
 */

function solveSudoku(grid) {
    var loc = {};
    
    if(findEmptyGridSlot(loc, grid) === true) {
        for(var num = 1; num <= 9; num++) {
            if(canPlaceNum(loc.row, loc.col, num, grid)) {
                grid[loc.row][loc.col] = num;
                if(solveSudoku(grid))
                    return true;
                grid[loc.row][loc.col] = 0;
            }
        }
        return false;
    } else {
        return true;
    }
}

function findEmptyGridSlot(loc, grid) {
    for(var r = 0; r <= 8; r++) {
        for(var c = 0; c <= 8; c++) {
            if(grid[r][c] === 0) {
                loc.row = r;
                loc.col = c;
                return true;
            }
        }
    }
    return false;
}

function canPlaceNum(row, col, num, grid) {
    // Check row
    for(var i = 0; i <= 8; i++) {
        if(grid[i][col] === num)
            return false;
    }
    // Check col
    for(var i = 0; i <= 8; i++) {
        if(grid[row][i] === num)
            return false;
    }
    // Check small grid
    var bigRow = ~~(row / 3);
    var bigCol = ~~(col / 3);
    for(var r = bigRow * 3; r <= (bigRow * 3) + 2; r++) {
        for(var c = bigCol * 3; c <= (bigCol * 3) + 2; c++) {
            if(grid[r][c] === num)
                return false;
        }
    }
    return true;
}

$(document).ready(function() {
    
    var grid = [
        [0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0]
    ];

    $('body').append($('<div>').addClass('wrapper')
            .append($('<div>').addClass('col')
            .append($('<h1>').html('Sudoku Solver'))
            .append(generateSudokuGrid())))
            .append($('<button>').html('Solve'));

    $('table[class^="sudoku"]').each(function () {
        populateGrid(this, grid);
    });
    
    $('table[class^="numGrid"]').each(function () {
        populateNumTable(this);
    });
    
    $('button').click( function () {
        $('table[class^="sudoku"').each(function () {
            readData(this, grid);
        });
        solveSudoku(grid);
        $('table[class^="sudoku"]').each(function () {
            populateGrid(this, grid);
        });
    });
    
    $('input[type="checkbox"]').click( function () {
        $('input[type="radio"]').each(function () {
            $(this).prop('checked', false);
        });
        $(this).prop('checked', true);
    });
    
    $('td').click( function () {
        var current;
        $('input[type="radio"]').each(function () {
            if($(this).is(':checked')) {
                current = parseInt($(this).attr('id'));
            }
        });
        if(current !== 0)
            $(this).text(current);
        else
            $(this).text('');
    });
});

function populateGrid(g, grid) {
    $(g).find('tr').each(function (row) {
        $(this).find('td').each(function (col) {
            $(this).text(grid[row][col] || '');
        });
    });
}

function readData(g, grid) {
    $(g).find('tr').each(function (row) {
        $(this).find('td').each(function (col) {
            if($(this).text() !== '')
                grid[row][col] = parseInt($(this).text());
            else
                grid[row][col] = 0;
        });
    });
}

function generateSudokuGrid() {
    return $('<table>').append(multiPush(9, function () {
        return $('<tr>').append(multiPush(9, function () {
            return $('<td>');
        }));
    })).addClass('sudoku');
}

function multiPush(count, func, scope) {
    var arr = [];
    for (var i = 0; i < count; i++) {
        arr.push(func.call(scope, i));
    }
    return arr;
}