--- STEAMODDED HEADER
--- MOD_NAME: Mod Loader Extension
--- MOD_ID: MOD_LOADER_EXTENSION
--- MOD_AUTHOR: [Stinkfire]
--- MOD_DESCRIPTION: Loads mods built using the balatrots modding API


----------------------------------------------
------------MOD LOADER EXTENSION------------------------
MLE = {};
MLE.MODS = {}

local console_file = io.open(love.filesystem.getSaveDirectory() .. "/console.txt", "w")
console_file:write("")
console_file:close()

function debugMessage(message)
    if message == nil then
        message = "nil"
    end

    -- if it's a table, convert it to a string
    if type(message) == "table" then
        message = tableToString(message)
    end
    message = tostring(message)
    local console = io.open(love.filesystem.getSaveDirectory() .. "/console.txt", "a")
    console:write(message .. "\n")
    console:close()
end

function tableToString(table)
    local string = ""
    for key, value in pairs(table) do
        if (type(value) == "table") then
            string = string .. tostring(key) .. ": " .. tableToString(value) .. "\n"
        else
            string = string .. tostring(key) .. ": " .. tostring(value) .. "\n"
        end
    end
    return string
end

function G.FUNCS.reload_mods(arg_736_0)
	G.SETTINGS.paused = true

    loadMods("Mods")	
end

local createOptionsRef = create_UIBox_options
function create_UIBox_options()
	contents = createOptionsRef()
	local exit_button = UIBox_button({
		minw = 5,
		button = "reload_mods",
		label = {
			"Reload Mods"
		}
	})
	table.insert(contents.nodes[1].nodes[1].nodes[1].nodes, #contents.nodes[1].nodes[1].nodes[1].nodes + 1, exit_button)
	return contents
end

function loadMods(modsDirectory)
    local mods = {}
    local modIDs = {}

    -- Function to process each directory (including subdirectories) with depth tracking
    local function processDirectory(directory, depth)
        if depth > 2 then
            return  -- Stop processing if the depth is greater than 2
        end

        for _, filename in ipairs(love.filesystem.getDirectoryItems(directory)) do
            local filePath = directory .. "/" .. filename


            -- Check if the current file is a directory
            if love.filesystem.getInfo(filePath).type == "directory" then
                -- If it's a directory and depth is within limit, recursively process it
                processDirectory(filePath, depth + 1)
            elseif filename:match("%.mod.lua$") then  -- Check if the file is a .lua file
                debugMessage("-----");
                debugMessage("-----Loading Mod Package " .. filePath + "-----");
                debugMessage("-----");
                local fileContent = love.filesystem.read(filePath);

                local loadedMods, err = load(fileContent)
                if not loadedMods then
                    debugMessage("Error loading file: " .. err)
                    return nil
                end

                local loadedMods = load(fileContent);
                local result = loadedMods()['default'];
            end
        end
    end

    -- Start processing with the initial directory at depth 1
    processDirectory(modsDirectory, 1)

    return mods
end

function SMODS.INIT.ModLoaderExtension()
    loadMods("Mods");
end
----------------------------------------------
------------MOD LOADER END--------------------