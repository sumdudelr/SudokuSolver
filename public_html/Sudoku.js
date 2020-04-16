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
    let loc = {};
    
    if(findEmptyGridSlot(loc, grid) === true) {
        for(let num = 1; num <= 9; num++) {
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
    for(let r = 0; r <= 8; r++) {
        for(let c = 0; c <= 8; c++) {
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
    for(let i = 0; i <= 8; i++) {
        if(grid[i][col] === num)
            return false;
    }
    // Check col
    for(let i = 0; i <= 8; i++) {
        if(grid[row][i] === num)
            return false;
    }
    // Check small grid
    var bigRow = ~~(row / 3);
    var bigCol = ~~(col / 3);
    for(let r = bigRow * 3; r <= (bigRow * 3) + 2; r++) {
        for(let c = bigCol * 3; c <= (bigCol * 3) + 2; c++) {
            if(grid[r][c] === num)
                return false;
        }
    }
    return true;
}

function init() {
    
    let grid = [
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

    const table = document.getElementById('table');
    for(let i=0; i<9; i++) {
        const row = table.insertRow(-1); // Append a row to the table
        for(let j=0; j<9; j++) {
            const cell = row.insertCell(-1); // Append a cell to the row
            // Set up event listener on each cell
            cell.addEventListener('click', event => {
                let current;
                document.getElementsByName('num').forEach(element => {
                    if(element.checked === true) {
                        current = parseInt(element.id);
                    }
                });
                if(current !== 0) {
                    cell.innerText = current;
                }
                else {
                    cell.innerText = '';
                }
            });
        }
    }
    
    populateGrid(table, grid);
    
    const solve = document.getElementById('solve');
    solve.addEventListener('click', (event) => {
        readData(table, grid);
        solveSudoku(grid);
        populateGrid(table, grid);
    });
    
    const clear = document.getElementById('clear');
    clear.addEventListener('click', event => {
        for(let i=0; i<9; i++) {
            for(let j=0; j<9; j++) {
                grid[i][j] = 0;
            }
        }
        populateGrid(table, grid);
    });
    
    document.getElementsByName('num').forEach(element => {
        element.addEventListener('click', event => {
            // Clear all radio buttons
            document.getElementsByName('num').forEach(radio => {
                radio.setAttribute('checked', false);
            });
            element.setAttribute('checked', true);
        });
    });
    
}

function populateGrid(g, grid) {
    for(let row=0; row<9; row++) {
        for(let col=0; col<9; col++) {
            g.rows[row].cells[col].innerText = grid[row][col] || '';
        }
    }
}

function readData(g, grid) {
    for(let row=0; row<9; row++) {
        for(let col=0; col<9; col++) {
            if(g.rows[row].cells[col].innerText !== '') {
                grid[row][col] = parseInt(g.rows[row].cells[col].innerText);
            }
            else {
                grid[row][col] = 0;
            }
        }
    }
}
